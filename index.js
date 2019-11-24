const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const pdf = require('html-pdf');
//add in like function Programmer and hae the inputs of name, position, id, email, office

function member(name, position, id, email, office) {
  this.name = name;
  this.position = position;
  this.id = id;
  this.email = email;
  this.office = office;
}

var count = 0;
memberArray = [];s

inquirer.prompt([
  {
    name: "memberNum",
    message: "how many team members?",
  }
]).then(function (member) {

  promptUser(member.memberNum)
});

function promptUser(pplCount) {
  if (count < pplCount) {
    console.log("New Programmer");

    inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "What is your name?"
      },
      {
        type: "input",
        name: "position",
        message: "What is your position"
      },
      {
        type: "input",
        name: "id",
        message: "Enter ID number"
      },
      {
        type: "input",
        name: "email",
        message: "Enter your email"
      },
      {
        type: "input",
        name: "office",
        message: "Enter your office number"
      },
      {
        type: "confirm",
        name: "confirm",
        message: "Add more team members?"
      }
    ]).then(function (info) {
      var newMember = new teamMember(
        info.name,
        info.position,
        info.id,
        info.office,
        info.email,
    });
    };
    memberArray.push(newMember);
  //else you are going to call generateHTML() and pass in programmerArray
  else {

      function generateHTML(info) {
        //last part of the code, since you might have mult ppl in the array you will dynmaically add each card via forloop
        return `
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">

  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
  
  <div class="jumbotron jumbotron-fluid" style="background-color: blue; text-align: center; color: white">
    <div class="container">
      <h1 class="display-4">My Team</h1>
    </div>
  </div>

  <div class="container mt-4">
      <div class="row">
          <div class="col-auto mb-3">
              <div class="card text-center" style="width: 18rem;">
                  <div class="card-body">
                      <h5 class="card-title" style="background-color: red">${info.name}</h5>
                      <h6 class="card-subtitle mb-2 text-muted">${info.position}</h6>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item">${info.id}</li>
                    <li class="list-group-item">${info.email}</li>
                    <li class="list-group-item">${info.office}</li>
                  </ul>
              </div>
          </div>
      </div>
  </div>`;
      }
    }

    async function init() {
      try {
        const info = await promptUser();
        const team = [];
        team.push(info);

        if info.confirm) {
          //promt user again
          let newMember = await promptUser();
          team.push(newMember);
        }

        console.log("------------------------------")

        console.log(info);
        const html = generateHTML(info);

        await writeFileAsync("index.html", html);

        var readHtml = fs.readFileSync('index.html', 'utf8');
        var options = { format: 'Letter' };

        pdf.create(readHtml, options).toFile('pdf.pdf', function (err, res) {
          if (err) return console.log(err);
          console.log(res);
        });

        console.log("Successfully wrote to index.html");
      } catch (err) {
        console.log(err);
      }
    }


    // init();
    //first step ask for num of ppl in team
    inquirer.prompt([
      {
        name: "numofppl",
        message: "How many people are on your team?"
      },
    ]).then(function (answers) {

      console.log(answers.numofppl);
      //once we get num of ppl on the team, we are going to ask promptuser(and pass in the number of ppl)
    });