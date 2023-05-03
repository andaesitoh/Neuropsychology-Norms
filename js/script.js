"use strict";

// Z Score Function

const calcZScore = (score, mean, sd) => (score - mean) / sd;

// Demographic Variables
const demographicVariables = function () {
  const age = document.querySelector("#age").value;
  return age;
};

// Submit Variables
const submit = document.querySelector(".submit-btn");
const resultDiv = document.querySelector("#result");

////////////////////////////////// NORMS DATA STRUCTURE ///////////////////////////////////

/*///////////////////////////////////
COWAT / FAS CALCULATIONS 
///////////////////////////////////*/

// Strauss et al. (2006) meta noorms
const totalCOWAT = [
  {
    ageRange: {
      min: 1,
      max: 39,
    },
    norms: {
      mean: 43.51,
      sd: 9.44,
    },
  },
  {
    ageRange: {
      min: 40,
      max: 59,
    },
    norms: {
      mean: 34.24,
      sd: 12.48,
    },
  },
  {
    ageRange: {
      min: 60,
      max: 79,
    },
    norms: {
      mean: 32.31,
      sd: 12.7,
    },
  },
  {
    ageRange: {
      min: 80,
      max: 95,
    },
    norms: {
      mean: 29.37,
      sd: 13.05,
    },
  },
];

// Wardill (2009) Category Test (For < 65, it will be Mitrushima)
const aniamlsCOWAT = [
  {
    ageRange: {
      min: 60,
      max: 64,
    },
    norms: {
      mean: 18.95,
      sd: 4.65,
    },
  },
  {
    ageRange: {
      min: 65,
      max: 69,
    },
    norms: {
      mean: 19.14,
      sd: 4.93,
    },
  },
  {
    ageRange: {
      min: 70,
      max: 74,
    },
    norms: {
      mean: 18.14,
      sd: 4.65,
    },
  },
  {
    ageRange: {
      min: 75,
      max: 79,
    },
    norms: {
      mean: 17.02,
      sd: 3.98,
    },
  },
  {
    ageRange: {
      min: 80,
      max: 100,
    },
    norms: {
      mean: 15.81,
      sd: 3.27,
    },
  },
];

const findTotalNorms = (age) => {
  const matchingAgeCategory = totalCOWAT.find((category) => {
    return age >= category.ageRange.min && age <= category.ageRange.max;
  });
  return matchingAgeCategory.norms;
};

const findAmnimalNorms = (age) => {
  const matchingAgeCategory = aniamlsCOWAT.find((category) => {
    return age >= category.ageRange.min && age <= category.ageRange.max;
  });
  return matchingAgeCategory.norms;
};

////////////////////////////////// PRESENTATION ///////////////////////////////////

// Logic for presenting (COWA)
submit.addEventListener("click", function () {
  // Obtain patient data
  const age = demographicVariables();

  // Obtain Norms
  const totalNorms = findTotalNorms(age);
  const animalNorms = findAmnimalNorms(age);

  // Obtain Raw Scores
  const rawTotal = document.querySelector("#COWATTotal").value;
  const rawAnimals = document.querySelector("#COWATAnimals").value;

  // Calculate Z-Score
  const scaledTotal = calcZScore(rawTotal, totalNorms.mean, totalNorms.sd);
  const scaledAnimals = calcZScore(
    rawAnimals,
    animalNorms.mean,
    animalNorms.sd
  );

  resultDiv.innerHTML = `
  <div class="result-box">
    <h2 class="result-heading">Result</h2>
    <p> (TOTAL) Z-score: ${scaledTotal.toFixed(2)}</p>
    <br>
    <p> (ANIMALS) Z-score: ${scaledAnimals.toFixed(2)}</p>
  </div>
  `;
});

////////////////////////////////// PRESENT BOXES BASED ON WHAT IS REQUESTED ///////////////////////////////////

const testSelect = document.querySelector("#test"); // This line selects the HTML element with an id of test using the document.querySelector() method and assigns it to the testSelect constan

testSelect.addEventListener("change", function () {
  // This line adds an event listener to the testSelect element for the change event. When the user selects an option from the test dropdown, this event is triggered.
  const selectedOption = this.options[this.selectedIndex]; // This line creates a new constant called selectedOption which stores the option element that the user has selected. The this keyword refers to the testSelect element and this.options refers to all the options within the testSelect dropdown. this.selectedIndex returns the index of the currently selected option in the dropdown.
  const className = selectedOption.dataset.class; // This line retrieves the value of the data-class attribute of the selected option and assigns it to the className constant. The data-class attribute stores the class name of the section that needs to be shown.
  const section = document.querySelector(`.${className}`); // This line selects the HTML section with a class name equal to the className constant, which corresponds to the data-class attribute of the selected option.

  // This line checks if the section element exists, and if it does, it removes the hidden class from it, making it visible on the page.
  if (section) {
    section.classList.remove("hidden");
  }
});
