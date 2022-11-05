import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Card, Row, Column, Form, Button, RecipeView } from '.././widgets';
import { NavLink, Redirect } from 'react-router-dom';
import service, { Ingredient, Recipe, Recipe_Content } from '.././service';
import { createHashHistory } from 'history';

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
export class EditRecipe extends Component<{ match: { params: { id: number } } }> {
  recipe: Recipe = {
    oppskrift_id: 0,
    oppskrift_navn: '',
    oppskrift_beskrivelse: '',
    oppskrift_steg: '',
    ant_pors: 0,
    bilde_adr: '',
    kategori_id: 0,
    land_id: 0,
    ant_like: 0,
    liked: false,
  };
  recipeContent: Recipe_Content[] = [];
  ingredients: Ingredient[] = [];
  selectedIngredients: Ingredient[] = [];
  selectedIngredient: Ingredient = {
    ingred_id: 1,
    ingred_navn: '',
  };
  searchterm: string = '';

  render() {
    return (
      <>
        <Card title={this.recipe.oppskrift_navn}>
          {/* input navn */}
          <Row>
            {/* input steg */}
            <Column>
              <Column width={2}>
                <Form.Label>Steg:</Form.Label>
              </Column>
              <Column>
                <Form.Textarea
                  id="recipe_step"
                  style={{ width: '600px' }}
                  type="text"
                  value={this.recipe.oppskrift_steg}
                  onChange={(event) => (this.recipe.oppskrift_steg = event.currentTarget.value)}
                  rows={5}
                />
              </Column>
            </Column>
          </Row>
          {/* input antall porsjoner */}
          <Column>
            <Column width={2}>
              <Form.Label>Porjsoner:</Form.Label>
            </Column>
            <Column>
              <Form.Input
                id="recipe_portions"
                type="number"
                value={this.recipe.ant_pors}
                //@ts-ignore
                onChange={(event) => (this.recipe.ant_pors = event.currentTarget.value)}
              />
            </Column>
          </Column>

          {/* renderer alle ingrediensene som er linket til oppskriften, her kan man også endre på hvor mye det er av hver ingrediens og måleenheten */}
          <Column>
            <div id="outprintIngredient">
              {this.recipeContent.map((rc, i) => (
                <p key={i}>
                  {this.ingredients.filter((ing) => rc.ingred_id == ing.ingred_id)[0].ingred_navn}
                  <input
                    id={'ingredNumber' + i.toString()}
                    style={{ width: '50px' }}
                    type="number"
                    value={rc.mengde}
                    onChange={(event) => (
                      //@ts-ignore
                      (rc.mengde = event.currentTarget.value), console.log(this.recipeContent)
                    )}
                  />
                  <input
                    style={{ width: '100px' }}
                    id={'ingredType' + i.toString()}
                    type="text"
                    value={rc.maleenhet}
                    onChange={(event) => (
                      //@ts-ignore
                      (rc.maleenhet = event.currentTarget.value), console.log(this.recipeContent)
                    )}
                  />
                  <Button.Danger onClick={() => this.deleteIngredient(rc.ingred_id)}>
                    x
                  </Button.Danger>
                </p>
              ))}
            </div>
          </Column>
          {/* print ut alle ingrediense som allerede er i databasen */}
          {/* vidre ideer her er at vi setter en viss lengde og bredde på diven og så hvis den overflower så må man bare skulle 
          nedover, her kan vi også implementere et søkefelt etterhvert for ingredienser. */}
          <Column>
            <Column>
              <Column width={2}>
                <Form.Label>Søk:</Form.Label>
              </Column>
              <select
                id="selectIngredientNewRecipe"
                onChange={(event) => {
                  console.log(event.target.value);
                  this.selectedIngredient.ingred_id = Number(event.currentTarget.value);
                  this.selectedIngredient.ingred_navn = event.currentTarget.selectedOptions[0].text;
                }}
                style={{ width: '210px' }}
              >
                {this.selectedIngredients.map((ingredient, i) => (
                  // @ts-ignore
                  // {i==0?console.log('homo'):''}
                  //make the first option the selected option

                  <option key={ingredient.ingred_id} value={ingredient.ingred_id}>
                    {ingredient.ingred_navn}
                  </option>
                ))}
              </select>
              <Form.Input
                id="newRecipeSearch"
                type="text"
                value={this.searchterm}
                onChange={(event) => {
                  this.search(event.currentTarget.value);
                  this.searchterm = event.currentTarget.value;
                }}
              />
            </Column>
            <Button.Success
              id="btnIngredAdd"
              onClick={() => {
                this.addIngredientFunc(
                  this.selectedIngredient.ingred_id,
                  this.props.match.params.id
                );
              }}
            >
              Legg til ny ingrediens
            </Button.Success>
          </Column>
        </Card>
        <Button.Success onClick={() => this.pushNewChanges()}>Endre oppskrift</Button.Success>
        <Button.Danger
          id="cancelEdit"
          onClick={() => history.push('/recipe/' + this.props.match.params.id)}
        >
          Cancel
        </Button.Danger>
      </>
    );
  }
  search(searchterm: string) {
    this.selectedIngredients = this.ingredients.filter((ingredient) =>
      ingredient.ingred_navn.toLowerCase().includes(searchterm.toLowerCase())
    );
    //@ts-ignore

    if (this.selectedIngredients.length === 0) {
      this.selectedIngredient = { ingred_id: 0, ingred_navn: '' };
    } else {
      document.getElementById('selectIngredientNewRecipe').value =
        this.selectedIngredients[0].ingred_id;
      //@ts-ignore
      this.selectedIngredient.ingred_id = this.selectedIngredients[0].ingred_id;
    }
  }
  //legger til nye ingredienser, sjekker først om de finnes, så legger den til i databasen og så blir det hentet ned igjen

  pushNewChanges() {
    console.log('nå sendes objektet', this.recipeContent);
    console.log(this.recipe);
    service
      .updateRecipe(this.recipe)
      .catch((error) => Alert.danger('Error updating recipe info: ' + error.message));

    service
      .updateRecipeIngredient(this.recipeContent)
      .then(() => history.push('/recipe/' + this.props.match.params.id))
      .catch((error) => Alert.danger('Error updating recipe content: ' + error.message));
  }
  addIngredientFunc(ingred_id: number, recipe_id: number) {
    //sjekker om ingrediensen allerede finnes i oppskriften
    const ifExist = this.recipeContent.map((element) =>
      element.ingred_id == ingred_id ? true : false
    );
    //hvis ingrediensen ikke finnes i oppskriften vil den bli lagt til
    if (!ifExist.includes(true)) {
      const add = { oppskrift_id: recipe_id, ingred_id: ingred_id, mengde: 0, maleenhet: '' };
      this.recipeContent.push(add);
    } else {
      Alert.info('denne ingrediensen finnes allerede i oppskriften');
    }
  }
  deleteIngredient(ingred_id: number) {
    //find index of ingred_id in recipeContent
    const index = this.recipeContent.findIndex((element) => element.ingred_id == ingred_id);
    //splice this index from recipeContent
    this.recipeContent.splice(index, 1);
  }
  mounted() {
    service
      .getAllIngredient()
      .then(
        (ingredients) => (
          (this.ingredients = ingredients), (this.selectedIngredients = ingredients)
        )
      )
      .catch((error) => {
        Alert.danger('Error getting ingredients: ' + error.message);
      });

    service
      .getRecipeContent(this.props.match.params.id)
      .then((recipeContent) => (this.recipeContent = recipeContent))
      .catch((error) => Alert.danger('Error getting recipe content: ' + error.message));

    service
      .getRecipe(this.props.match.params.id)
      .then((recipe) => {
        this.recipe = recipe[0];
      })
      .catch((error) => Alert.danger('Error getting recipe: ' + error.message));
  }
}
