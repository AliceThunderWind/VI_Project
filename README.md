# VI_Project

- Membres: Maillefer Dalia, Vervelle Killian
- Public cible: Grand public
- Intention/objectif: Démontrer que la crise mondiale alimentaire n'est pas une question de productivité mais bien de répartition
- Source(s) de données: https://www.fao.org/gift-individual-food-consumption/data/en
- Descriptif du projet: Visualisation des données au moyen d'une page HTML
- Lien du projet: https://github.com/AliceThunderWind/VI_Project
- Date de présentation souhaitée: TBD


## Architecture, Frameworks and Technologies

This project contains a backend and a frontend, in other words our website. For our backend, we used FastAPI as framework and its goal is to get all data from CSVs and send them to the frontend in a JSON format.

As for the frontend, we created from scratch a website using the framework React and JavaScript as language. With this, we were able to use the library D3.js, well-known for creating charts and visualization.

Finally, in order to have cleaned data and ready to be used, we have worked with Python Notebook.

## Documentation

### Choice of data

The data we used during this project comes from the website of the Food and Agriculture Organization on the United Nations ([FAO](https://www.fao.org/gift-individual-food-consumption/data/en)).

We can find information such as :

- Name of the country
- ISO2 and ISO3
- Population
- Production
- Import quantity
- Stock variation
- Export quantity
- Feed
- Losses
- Residuals
- Seed
- Food
- Domestic supply
- Proteine supply
- Food supply kcal
- Undernourished rates

### Intention, message, audience

We would like to demonstrate to the general public that the global food crisis is not a question about productivity but of distribution. With our application, we would be able to understand the complex interaction of the element in the equation (**Domestic supply quantity = Production qty + Imports + Opening stock - Exports - Closing stock - Food - Feed - Seed - Losses -+ Processed - Others uses - Tourist consumption - Residuals**), identify underlying causes and define opportunities/areas of intervention.

### Representation, Presentation and interaction

#### General

In the whole website, we used only one typography in order to have consistency in the text while navigating. We also used font weight (bold text) to emphasize title or important information.

#### World map

Because we are interested in the malnutrition in the world, it is natural to work with a map of the world in order to have an overview of the malnutrition rate. We used D3.js to create the map (from a JSON file in the `/assets` folder) and draw a country by its border. Since we're interested in the country, we didn't use another library  like Leaflet because their maps also display city names, roads, etc. These are useless information, will not add anything to the analysis and therefore will overload our map. We decided to keep it simple. The user can zoom in and out using either buttons on the left or the mouse (scroll), drag the map and select a country. This is following a few recommendation from Ben Shneiderman such as overview, zoom and details-on-demand.

We may recognize some countries and know its location on the map. But sometimes, we don't. Therefore, we also added a dropdown menu containing the list of all countries sorted alphabetically. Even if we select a country on the map or on the dropdown menu, the result will still be the same, which is displaying a popup in the center of the map, showing more details about malnutrition rate over the year.

![](./assets/home_select.png)

As for the interaction, when the user is hovering a country, we made the color a bit lighter to show the selected country under the mouse. We also displayed the name of the country in the center of the latter.

![Alt text](./assets/home_hover.png)

The user can then click on the country and a popup will be displayed with a line chart of the malnutrition rate over a period of 6 years. If the user is interested by knowing more information about the selected country, he can click on the "More" button (also with a hover effect, darken the color) and he will be brought to another page

![](./assets/home_popup.png)

Regarding the color used, we made sure to use few colors and also meaningful ones. For instance, in our map, we used 3 colors (green, orange and red) that are meaningful in our culture. Indeed, green  represents something positive and signifies areas with favorable nutritional conditions, while orange serves as a cautionary color, indicating regions with moderate levels of malnutrition. Red is reserved for areas with a high malnutrition rate, emphasizing critical zones that demand urgent attention.

#### Details about a country

For the page of details about a country, we chose to represent our data using a grouped bar chart.

![Alt text](./assets/country_stacked_bar.png)

We have paid particular attention to the notion of data ink ratio. Before, in the y-axis, the unit used was the kilogram, leading to values in the scaling with lots of zero (in other words, values in millions). We used to have borders to delimit all grids in the page. Finally, the legend displayed all values below each other, even though, we have two bars with different categories.

The changes we made was to remove all borders, change the unit to megatonnes and we put spaces between [Production, Import Quantity, Stock Variation] and [Export Quantity, Feed, Seed, Losses and Food] with the goal to show to the user that categories in the top of the legend is for the left bar and categories in the bottom is for the right one.

We've also thought about color-blind people by using an appropriate color palette and checked with the website [Colblindor](https://www.color-blindness.com/coblis-color-blindness-simulator/)

Normal view :

![Alt text](./assets/country_blindness.png)

Red-weak/Protanomaly :

![Alt text](./assets/country_blindness_1.png)

We also guide the user by telling him to click on any category of the stacked chart. Not only, we lighten the category on hover (and also display the name of the category and its value), but a table with details within a category will be shown on the right of the screen containing items and their respective values in a descending order.

![Alt text](./assets/country_table.png)

Finally, we also provide an analysis at the bottom right of the page, showing to the user the ratio of food that is fed to the population with the total amount of food available.

#### World overview with charts

Finally, we dedicated the last page of our website to world hunder facts and statistics. At the right of each graph, we gave an analysis as complement in order to have a better understanding of the chart.

In all of our charts, we systematically start the y-axis with zero, in order to not have a biased interpretation of the data shown.

The first graph is about displaying the evolution of the average daily calorie intake over 5 years using a line chart. Those values come from a computation where we sum the food supply kcal for year 2014 and 2019 then divided by the population, divided by 365 days.

![](./assets/charts_line.png)

The second graph we created is a bar chart with the goal to show the top 30 countries with the highest malnutrition rate.

![](./assets/charts_bars.png)

When it comes to showing data over time, we came with the idea to use a slider and let the user interact with our chart and choose a specific year. When selecting a year, charts will update data accordingly to the chosen year.

Finally, in our last graph, we chose to show the top 5 of item with the highest feed to production ratio. We opted for a rounded-form chart over rectangular one with the goal of diversify our graphs.

![](./assets/charts_pie.png)

The user can also interact with the chart by clicking a radio button. We chose a radio button over a slider because we only have two years of data available (2014 and 2019) and it would be interesting to use a slider with more years.

### Critique of tool(s) used

Using the library D3.js for the first was a bit difficult, especially for our specific needs. For instance, when we wanted to display a label below the graph, either the text was cropped or invisible. We had to figure out how to make the text visible with margin, padding, resizing the graph, etc.

## Installation

### Run with Docker

A `docker-compose.yaml` is located at the root of the repository. With the two commands below, you will be able to run our application and API :

```bash
docker compose build
docker compose up -d
```

Then, head over to [http://localhost:3000](http://localhost:3000) and you will be able to navigate in our website.

### Run without Docker

If you wish to run without Docker, you can run the two applications but make sure you have the version 18 for Node and Python 3.9.

For running the backend, you will need to install librairies. You may choose to use a venv (with Conda) if you want. From the folder `src/`, run the following command :

```bash
pip install -r requirements.txt
uvicorn main:app --reload
```

As for the frontend, you will also need to install dependencies from the package.json. Use the commands below to install and run the application :

```bash
npm install
npm start
```

If everything is running properly, you should be able to have our home page ([http://localhost:3000](http://localhost:3000)) and data displayed from the API (Swagger available in [http://localhost:8000/docs](http://localhost:8000/docs))