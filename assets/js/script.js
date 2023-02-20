//Wrap all code that interacts with the DOM in a call to jQuery to ensure that the code isn't run until the browser has finished rendering all the elements in the HTML doc.
$(function () {
  var timeBlock = $(".time-block");
  var saveButton = $(".saveBtn");
  //Use JSON.parse() to return string in local storage to a JS object.
  var storedTasks = JSON.parse(localStorage.getItem("savedTasks"));

  //Add a listener for click events on the save button. 'This' references the specific save button object clicked. Use JSON.stringify() to turn JS objects into a string for local storage.
  saveButton.on("click", function () {
    var taskInput = $(this).siblings(".description").val();
    var hour = $(this).parent().attr("id");
    console.log(hour);
    console.log(taskInput);
    var newTask = {
      hour: hour,
      taskInput: taskInput,
    };
    var savedTasks = JSON.parse(localStorage.getItem("savedTasks")) || [];
    savedTasks.push(newTask);
    localStorage.setItem("savedTasks", JSON.stringify(savedTasks));
  });

  //Apply the past, present, or future class to each time block dynamically by comparing the id to the current hour. Use each() to loop through all time blocks within the HTML doc. Use 'this' keyword to specify which div.
  function getCurrentHour() {
    var currentHour = dayjs().hour();

    timeBlock.each(function () {
      var hourDiv = parseInt($(this).attr("id"));

      if (hourDiv < currentHour) {
        $(this).addClass("past");
        $(this).removeClass("present");
        $(this).removeClass("future");
      } else if (hourDiv === currentHour) {
        $(this).addClass("present");
        $(this).removeClass("past");
        $(this).removeClass("future");
      } else {
        $(this).addClass("future");
        $(this).removeClass("past");
        $(this).removeClass("present");
      }
    });
  }

  getCurrentHour();
  setInterval(getCurrentHour, 1000);

  //Use the globally scoped variable storedTasks to get any user input that was saved in localStorage. The each() method will run the function for each time block. Use a for loop to compare a time block's id to the hour key and display the values in the corresponding text areas.
  timeBlock.each(function () {
    var id = parseInt($(this).attr("id"));
    if (storedTasks) {
      for (let i = 0; i < storedTasks.length; i++) {
        if (id == storedTasks[i].hour) {
          $(this).children(".description").text(storedTasks[i].taskInput);
        }
      }
    }
  });

  //Display the current date in the header of the page.
  function displayDay() {
    var today = dayjs().format("dddd, MMMM D");
    $("#currentDay").text(today);
  }

  //Use setInterval() to update date automatically, even if page remains open and not reloaded.
  displayDay();
  setInterval(displayDay, 1000);
});
