// Error 1 (grade.html, Line 9): Missing 'return' in onsubmit="checkMark()", causing the form to submit and reload the page. Fixed to onsubmit="return checkMark()".
// Error 2 (grade.html, Line 17): Wrong casing in onclick="showtable()". Fixed to onclick="showTable()".
// Error 3 (grade.html, Line 19): Wrong script filename src="grades.js". Fixed to src="grade.js".
// Error 4 (grade.js, Line 5): Assignment operator '=' used instead of comparison '==' in if (name = ""). Fixed to if (name.trim() === "").
// Error 5 (grade.js, Line 9): Misspelled function 'isNan(mark)'. Fixed to 'isNaN(mark)'.
// Error 6 (grade.js, Line 14): Wrong logical operator '&&' in if (mark < 0 && mark > 100). Fixed to '||' (if (mark < 0 || mark > 100)).
// Error 7 (grade.js, Line 28): Wrong casing in 'document.getElementByID("result")'. Fixed to 'document.getElementById("result")'.
// Error 8 (grade.js, Line 30): Wrong casing in 'getElementByID' and British spelling '.style.colour'. Fixed to 'getElementById' and '.style.color'.
// Error 9 (grade.js, Line 31): 'return true;' submits the form and reloads the page, making the result disappear immediately. Fixed to 'return false;'.
// Error 10 (grade.js, Lines 38 & 42): Loop started at 'i = 1' skipping grade "A" (fixed to 'i = 0'), and wrong casing '.innerHtml' (fixed to '.innerHTML').

// Function to validate inputs, calculate grade, and display styled output
function checkMark() {
    let name = document.forms["gradeForm"]["name"].value;
    let mark = document.forms["gradeForm"]["mark"].value;

    // Fix Error 4: Check if name is empty using comparison operator
    if (name.trim() === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Check for an empty mark field
    if (mark.trim() === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Fix Error 5: Corrected isNaN capitalization
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    mark = parseInt(mark);

    // Fix Error 6: Use OR (||) operator to check out-of-range marks
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine grade and corresponding text color (Part 2, Step 6)
    let grade;
    let resultColor;

    if (mark >= 80) {
        grade = "A";
        resultColor = "green";
    } else if (mark >= 65) {
        grade = "B";
        resultColor = "green";
    } else if (mark >= 50) {
        grade = "C";
        resultColor = "orange";
    } else {
        grade = "F";
        resultColor = "red";
    }

    // Fix Errors 7 & 8: Corrected getElementById and style.color
    let resultElement = document.getElementById("result");
    resultElement.innerHTML = name + " got grade " + grade;
    resultElement.style.color = resultColor;

    // Display the date and time the grade was checked
    document.getElementById("checkedTime").innerHTML = "Checked on: " + Date();

    // Fix Error 9: Return false so the page does not refresh and clear the result
    return false;
}

// Generate a random integer from 0 to 100 into the mark field
function generateRandomMark() {
    let randomScore = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomScore;
}

// Function to build and display the reference grade table
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    // Added table header row for clarity
    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";

    // Fix Error 10: Start loop at index 0 so grade "A" is included
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";

    // Fix Error 10: Corrected innerHTML capitalization
    document.getElementById("tableContainer").innerHTML = tableHTML;
}