import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { Cards, Card, Alert, Columns, Row, Rows, Form, RecipeView } from '../widgets';

import service, { Recipe } from '../service';
import Select from 'react-select';

export class ShowAllRecipe extends Component {
  countries: [{ value: number; label: string }] = [{ value: 0, label: 'Søk på land' }];
  categories: [{ value: number; label: string }] = [{ value: 0, label: 'Søk på kategori' }];
  originalrecipes: Recipe[] = [];
  recipes: Recipe[] = [];
  searchterm: string = '';
  sortByArray: number = 1;
  hideInput: string = 'inline';
  hideSelect: string = 'none';
  render() {
    return (
      <>
        <div className="margintop">
          <Card title="">
            <br />
            <div className="text-center">
              <Rows>
                {/* søk og sortering av oppskrifter  */}
                <Form.Input
                  id="indexsearch"
                  style={{ width: '220px', display: this.hideInput }}
                  type="text"
                  placeholder="Søk etter oppskrift"
                  value={this.searchterm}
                  onChange={(event) => {
                    this.search(event.currentTarget.value);
                    this.searchterm = event.currentTarget.value;
                  }}
                />
                <div
                  id="showSelect"
                  style={{ width: '220px', paddingLeft: '0px', display: this.hideSelect }}
                >
                  <Select
                    id="selectCountryCategory"
                    options={this.sortByArray == 4 ? this.countries : this.categories}
                    onChange={(event) => {
                      this.search(event?.label);
                      this.searchterm = event?.label || '';
                    }}
                  />
                </div>
                <select
                  id="sortBy"
                  style={{ width: '220px' }}
                  onChange={(event) => this.sortRecipe(Number(event.target.value))}
                  className="form-select"
                >
                  <option value="1">A-Z</option>
                  <option value="2">Z-A</option>
                  <option value="3">Nyeste</option>
                  <option value="4">Land</option>
                  <option value="5">Kategori</option>
                </select>
              </Rows>
            </div>
            <br></br>

            {/* Viser alle tilgjengelige oppskrifter*/}
            <div className="container-fluid ">
              <Rows>
                {this.recipes.map((recipe) => (
                  <Cards title="" numbOfPors={recipe.ant_pors} key={recipe.oppskrift_id}>
                    <a className="black" href={'#/recipe/' + recipe.oppskrift_id}>
                      <RecipeView
                        img={recipe.bilde_adr}
                        name={recipe.oppskrift_navn}
                        numbOfPors={recipe.ant_pors}
                      ></RecipeView>
                    </a>
                  </Cards>
                ))}
              </Rows>
            </div>
          </Card>
        </div>
      </>
    );
  }

  /* Sorterer ingredienene etter det som blir valgt i selecten */
  sortRecipe(value: number) {
    this.sortByArray = value;
    //@ts-ignore
    //or create element input with id indexsearch
    let aaa = document.getElementById('indexsearch') || document.createElement('input');
    if (value == 0) {
      this.hideInput = 'none';
      this.hideSelect = 'none';
    }
    /* Sorter A-Z */
    if (value == 1) {
      this.hideInput = 'inline';
      this.hideSelect = 'none';
      //@ts-ignore
      aaa.placeholder = 'Søk etter oppskrift';
      this.recipes.sort(function (a, b) {
        const x = a.oppskrift_navn.toLowerCase();
        const y = b.oppskrift_navn.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
    } else if (value == 2) {
      /* Sorter Z-A */
      this.hideInput = 'inline';
      this.hideSelect = 'none';
      //@ts-ignore
      aaa.placeholder = 'Søk etter oppskrift';
      this.recipes.sort(function (b, a) {
        const x = a.oppskrift_navn.toLowerCase();
        const y = b.oppskrift_navn.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
    } else if (value == 3) {
      /* Sorter etter nyeste */
      this.hideInput = 'inline';
      this.hideSelect = 'none';
      //@ts-ignore
      aaa.placeholder = 'Søk etter oppskrift';
      this.recipes.sort(function (b, a) {
        const x = a.oppskrift_id;
        const y = b.oppskrift_id;
        return x < y ? -1 : x > y ? 1 : 0;
      });
    } else if (value == 4) {
      /* Sorter etter Land */

      this.hideInput = 'none';
      this.hideSelect = 'inline';
      //@ts-ignore
      aaa.placeholder = 'Søk etter land';
    } else if (value == 5) {
      /* Sorter etter Kategori */
      this.hideInput = 'none';
      this.hideSelect = 'inline';
      //@ts-ignore
      aaa.placeholder = 'Søk etter kategori';
    }
  }
  mounted() {
    /* Hent alle oppskrifter */
    service
      .getAllRepice()
      .then((recipes) => (this.originalrecipes = recipes))
      .then((recipes) => (this.recipes = recipes))
      .catch((error) => Alert.danger('Error getting recipes: ' + error.message));

    /* Hent alle land */
    service
      .getAllCountry()
      .then((countries) => {
        countries.forEach((element) => {
          this.countries.push({ value: element.land_id, label: element.land_navn });
        });
      })
      .catch((error) => Alert.danger('Error getting countries: ' + error.message));

    /* Hent alle kategorier */
    service
      .getAllCategory()
      .then((categories) =>
        categories.forEach((element) => {
          this.categories.push({ value: element.kategori_id, label: element.kategori_navn });
        })
      )
      .catch((error) => Alert.danger('Error getting categories: ' + error.message));
  }

  /* Søk etter oppskrift, hvis man velger land eller kategori vil man kunne velge land eller kategori*/
  search(searchterm: any) {
    // let searchFilter = { value: 4 };
    let searchFilter = document.getElementById('sortBy') || document.createElement('select');
    //find searchFilter value

    //if searchFilter is 0,1,2,3 then sort by name
    if (
      //@ts-ignore
      Number(searchFilter.value) == 0 ||
      //@ts-ignore
      Number(searchFilter.value) == 1 ||
      //@ts-ignore
      Number(searchFilter.value) == 2 ||
      //@ts-ignore
      Number(searchFilter.value) == 3
    ) {
      this.recipes = this.originalrecipes.filter((recipe) =>
        recipe.oppskrift_navn.toLowerCase().includes(searchterm.toLowerCase())
      );
    }
    //if searchFilter is 4 then sort by country
    //@ts-ignore
    else if (Number(searchFilter.value) == 4) {
      let countryId = this.countries.find((country) =>
        country.label.toLowerCase().includes(searchterm.toLowerCase())
      );
      this.recipes = this.originalrecipes.filter((recipe) => recipe.land_id == countryId?.value);
    }
    //if searchFilter is 5 then sort by category
    else {
      let categoryId = this.categories.find((category) =>
        category.label.toLowerCase().includes(searchterm.toLowerCase())
      );
      this.recipes = this.originalrecipes.filter(
        (recipe) => recipe.kategori_id == categoryId?.value
      );
    }
  }
}
