import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Card, Row, Column, Form, Button } from '.././widgets';
import service, { Recipe, Recipe_Content } from '.././service';
import { createHashHistory } from 'history';
import Select from 'react-select';

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
  ingredient: string = '';
  addIngredientToRecipe: Recipe_Content[] = [];
  iDsDeletedIngredient: any = [];
  recipeContent: Recipe_Content[] = [];
  ingredients: [{ value: number; label: string }] = [{ value: 0, label: 'Søk på ingredienser' }];

  render() {
    return (
      <>
        <div className="margintop">
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
                    style={{ width: '500px', height: '400px' }}
                    type="text"
                    value={this.recipe.oppskrift_steg}
                    onChange={(event) => (this.recipe.oppskrift_steg = event.currentTarget.value)}
                    rows={5}
                  />
                </Column>
              </Column>
            </Row>
            <Row>
              {/* input antall porsjoner */}
              <Column>
                <Column width={2}>
                  <Form.Label>Porsjoner:</Form.Label>
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
            </Row>
            <Row>
              {/* print ut alle ingrediense som allerede er i databasen */}
              {/* vidre ideer her er at vi setter en viss lengde og bredde på diven og så hvis den overflower så må man bare skulle 
          nedover, her kan vi også implementere et søkefelt etterhvert for ingredienser. */}
              <Column>
                <Column>
                  <Column width={2}>
                    <Form.Label>Søk:</Form.Label>
                  </Column>
                  <Select
                    id="choseIngredient"
                    options={this.ingredients}
                    onChange={(event) => {
                      // @ts-ignore
                      this.addIngredientFunc(event?.value, this.props.match.params.id);
                    }}
                  />
                </Column>
              </Column>
            </Row>
            <Row>
              <Column>
                <br />
                <Form.Input
                  id="createIngredient"
                  type="text"
                  style={{ width: '210px' }}
                  value={this.ingredient}
                  onChange={(event) => (this.ingredient = event.currentTarget.value)}
                  placeholder="Skriv inn ny ingrediens"
                ></Form.Input>
                <Button.Success
                  id="createIngredientFunc"
                  onClick={() => {
                    this.createIngredientFunc(this.ingredient);
                  }}
                >
                  Legg til
                </Button.Success>
              </Column>
            </Row>
            {/* renderer alle ingrediensene som er linket til oppskriften, her kan man også endre på hvor mye det er av hver ingrediens og måleenheten */}
            <br />
            <Column>
              <div id="outprintIngredient" className="scroll">
                {this.recipeContent.map((rc, i) => (
                  <Row key={i}>
                    <p style={{ width: '215px' }}>
                      {this.ingredients.find((ing) => ing.value == rc.ingred_id)?.label}
                    </p>
                    <input
                      className="form-control"
                      id={'ingredNumber' + i.toString()}
                      style={{ width: '75px', marginRight: '0px' }}
                      type="number"
                      value={rc.mengde}
                      onChange={(event) =>
                        //@ts-ignore
                        (rc.mengde = event.currentTarget.value)
                      }
                    />
                    <input
                      className="form-control"
                      style={{ width: '120px' }}
                      id={'ingredType' + i.toString()}
                      type="text"
                      value={rc.maleenhet}
                      onChange={(event) =>
                        //@ts-ignore
                        (rc.maleenhet = event.currentTarget.value)
                      }
                    />
                    <Column width={2}>
                      <Button.Danger onClick={() => this.deleteIngredient(rc.ingred_id)}>
                        x
                      </Button.Danger>
                    </Column>
                  </Row>
                ))}
              </div>
            </Column>
          </Card>
          <Button.Success onClick={() => this.pushNewChanges()}>Endre oppskrift</Button.Success>
          <Button.Danger
            id="cancelEdit"
            onClick={() => history.push('/recipe/' + this.props.match.params.id)}
          >
            Avbryt
          </Button.Danger>
        </div>
      </>
    );
  }
  createIngredientFunc(string: string) {
    if (string.length > 0 && string != '') {
      service
        .createIngredient(string)
        .then(() => {
          this.getAllIngredients();
          Alert.info('Ingrediens lagt til');
          this.ingredient = '';
        })
        .catch((error) => Alert.danger('Error creating the new ingredient: ' + error.message));
    }
  }

  //legger til nye ingredienser, sjekker først om de finnes, så legger den til i databasen og så blir det hentet ned igjen

  pushNewChanges() {
    service
      .updateRecipe(this.recipe)
      .catch((error) => Alert.danger('Error updating recipe info: ' + error.message));

    this.iDsDeletedIngredient.forEach((element: any) => {
      service
        .deleteIngredient(element.recipe_id, element.ingred_id)
        .catch((error) => Alert.danger('Error deleting ingredient: ' + error.message));
    });
    //map throug recipeContent and update elements inn addIngredientToRecipe if ingredient already exists
    //than splice the elemnt from recipeContent
    this.addIngredientToRecipe.map((element, i) => {
      this.recipeContent.map((rc, j) => {
        if (element.ingred_id == rc.ingred_id) {
          service
            .createRecipeIngredient([rc])
            .then(() => this.recipeContent.splice(j, 1))
            .catch((error) => Alert.danger('Error adding ingredient to recipe: ' + error.message));
        }
      });
    });

    service
      .updateRecipeIngredient(this.recipeContent)
      .then(() => history.push('/recipe/' + this.props.match.params.id))
      .catch((error) => Alert.danger('Error updating recipe content: ' + error.message));
  }
  addIngredientFunc(ingred_id: number, recipe_id: number) {
    console.log(ingred_id);
    //sjekker om ingrediensen allerede finnes i oppskriften
    const ifExist = this.recipeContent.map((element) =>
      element.ingred_id == ingred_id ? true : false
    );
    //hvis ingrediensen ikke finnes i oppskriften vil den bli lagt til
    if (!ifExist.includes(true)) {
      const add = { oppskrift_id: recipe_id, ingred_id: ingred_id, mengde: 0, maleenhet: '' };
      this.recipeContent.push(add);
      this.addIngredientToRecipe.push(add);
    } else {
      Alert.info('denne ingrediensen finnes allerede i oppskriften');
    }
  }
  deleteIngredient(ingred_id: number) {
    //find index of ingred_id in recipeContent
    const index = this.recipeContent.findIndex((element) => element.ingred_id == ingred_id);
    //splice this index from recipeContent
    this.recipeContent.splice(index, 1);
    this.iDsDeletedIngredient.push({ ingred_id: ingred_id, recipe_id: this.recipe.oppskrift_id });
  }

  getAllIngredients() {
    service
      .getAllIngredient()
      .then((ingredients) =>
        ingredients.forEach((element) => {
          this.ingredients.push({ value: element.ingred_id, label: element.ingred_navn });
        })
      )
      .catch((error) => {
        Alert.danger('Error getting ingredients: ' + error.message);
      });
  }
  mounted() {
    this.getAllIngredients();
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
