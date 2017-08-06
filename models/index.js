var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack',{ logging: false });
// { logging: false } this hides the query output in the terminal

var Page = db.define(
	'page', // name of table
	{  // this is where you define the db values
		title: {type: Sequelize.STRING, allowNull: false} , 
		urlTitle: {type: Sequelize.STRING, allowNull: true},
		content: {type: Sequelize.TEXT, allowNull: false},
		status: {type: Sequelize.STRING},
		date: {type: Sequelize.DATE, defaultValue: Sequelize.NOW}
	},
	{
		getterMethods: {
			getRoute(){
				return '/wiki/' + this.urlTitle;
			}
		},
		hooks:{
			beforeValidate:
				function(page){
					if(page.title){
						page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
					}
					else{
						return Math.random().toString(36).substring(2, 7);
					}
				}
		}
	}
);
var User = db.define(
	'user', // name of table
	{ //thi is where you define the db values
		name: {type: Sequelize.STRING, allowNull: false},
		email: {type: Sequelize.STRING, allowNull: false}
	}
	//put methods here in another argument
)

module.exports = {
  Page: Page,
  User: User,
  db: db
};