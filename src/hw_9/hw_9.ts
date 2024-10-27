interface IFilm { 
    name: string;
    year: number;
    rate: number;
    awards: string[];
}

interface ICategory {
    name: string;
    films: IFilm[];
}

enum GridFilterTypeEnum { 
    Match,
    Range,
    ValueSearch,
}

type GridFilterValue<T> = {
    type: GridFilterTypeEnum;                
    filter: Extract<T, string | number>;       
    filterTo?: Extract<T, string | number>;
};
  
type GridFilterSetValues<T> = {
    values: T[];
};

interface IFilmFilters {
    name: GridFilterSetValues<string>;
    year: GridFilterValue<number>;
    rate: GridFilterValue<number>;
    awards: GridFilterSetValues<string>;
}
 
interface ICategoryFilters {
    name: GridFilterSetValues<string>;
}

class FilmList {
    films: IFilm[];
    filters: IFilmFilters;

    constructor(films: IFilm[]){
      this.films = films;
      this.filters = {
        name: { values: [] },
        year: { type: GridFilterTypeEnum.Range, filter: 0, filterTo: 0 },
        rate: { type: GridFilterTypeEnum.Range, filter: 0, filterTo: 0 },
        awards: { values: [] },
        };
      }

       applySearchValue(filterType: keyof IFilmFilters, value: any): void {
        if (filterType === "name" || filterType === "awards") {
            this.filters[filterType].values = value;
        } else {
            this.filters[filterType].filter = value.filter;
            if ("filterTo" in value) this.filters[filterType].filterTo = value.filterTo;
        }
      }

      getFilteredFilms(): IFilm[] {
        return this.films.filter((film) => {
          const nameMatch = this.filters.name.values.length === 0 || this.filters.name.values.includes(film.name);
          const yearMatch = film.year >= this.filters.year.filter && (!this.filters.year.filterTo || film.year <= this.filters.year.filterTo!);
          const rateMatch = film.rate >= this.filters.rate.filter && (!this.filters.rate.filterTo || film.rate <= this.filters.rate.filterTo!);
          const awardsMatch = this.filters.awards.values.length === 0 || film.awards.some((award) => this.filters.awards.values.includes(award));
      
          return nameMatch && yearMatch && rateMatch && awardsMatch;
        });
      }      
    }

class CategoryList {
    categories: ICategory[];
    filters: ICategoryFilters;

    constructor(categories : ICategory[]){
        this.categories = categories;
        this.filters = {
            name: {values: [] },
        }
    }

    applySearchValue(filterType: keyof ICategoryFilters, value: any): void { 
        if(filterType === "name"){
            this.filters[filterType].values = value;
        }
    }

    getFilteredCategories(): ICategory[] {
        return this.categories.filter((category) => {
            const nameMatch = this.filters.name.values.length === 0 || this.filters.name.values.includes(category.name);
            return nameMatch;
        })
    }

}  

const films: IFilm[] = [
    { name: "The Lord of the Rings: The Return of the King", year: 2003, rate: 8.9, awards: ["Oscar", "Golden Globe"] },
    { name: "Inception", year: 2010, rate: 8.8, awards: ["Oscar"] },
    { name: "The Dark Knight", year: 2008, rate: 9.0, awards: ["Oscar", "BAFTA"] },
    { name: "Interstellar", year: 2014, rate: 8.6, awards: ["Oscar"] },
    { name: "Parasite", year: 2019, rate: 8.6, awards: ["Oscar", "Golden Globe", "BAFTA"] },
    { name: "Spirited Away", year: 2001, rate: 8.6, awards: ["Oscar"] },
    { name: "Your Name", year: 2016, rate: 8.4, awards: ["Japan Academy Prize"] },
    { name: "Akira", year: 1988, rate: 8.0, awards: [] },
    { name: "Princess Mononoke", year: 1997, rate: 8.4, awards: ["Japan Academy Prize"] },
  ];

const categories: ICategory[] = [
    { name: "Action", films: [films[0], films[2], films[3]] },
    { name: "Sci-Fi", films: [films[1], films[3], films[7]] }, 
    { name: "Drama", films: [films[4]] },
    { name: "Anime", films: [films[5], films[6], films[7], films[8]] }, 
  ];

const filmList = new FilmList(films);
filmList.applySearchValue("year", { filter: 2010, filterTo: 2016 });
filmList.applySearchValue("name", ["Inception", "Your Name"]);
filmList.applySearchValue("awards", "Japan Academy Prize");
console.log(filmList.getFilteredFilms());

const categoryList = new CategoryList(categories);
categoryList.applySearchValue("name", "Anime");
console.log(JSON.stringify(categoryList.getFilteredCategories(), null, 2));
