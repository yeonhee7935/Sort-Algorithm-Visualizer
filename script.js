let comparing = []; // 현재 비교 중인 인덱스 저장

// Function to visualize the array with highlighted bars
function visualizeArray(arr, comparing = []) {
  arrayBars.innerHTML = "";
  arr.forEach((value, idx) => {
    const bar = document.createElement("div");
    bar.classList.add("array-bar");
    bar.style.height = `${value * 5}px`;

    // Highlight comparing bars
    if (comparing.includes(idx)) {
      bar.classList.add("highlight");
    }

    // Add the value on top of the bar
    const barValue = document.createElement("span");
    barValue.innerText = value;
    bar.appendChild(barValue);

    arrayBars.appendChild(bar);
  });
}

// Bubble Sort Algorithm with step recording and current comparison
function bubbleSort(arr) {
  const newArr = [...arr];
  let sortedSteps = [];
  let swapped;

  for (let i = 0; i < newArr.length; i++) {
    swapped = false;
    for (let j = 0; j < newArr.length - i - 1; j++) {
      // Record the indices being compared
      sortedSteps.push({ array: [...newArr], comparing: [j, j + 1] });

      if (newArr[j] > newArr[j + 1]) {
        [newArr[j], newArr[j + 1]] = [newArr[j + 1], newArr[j]]; // Swap
        swapped = true;
      }

      // Record the array after the swap
      sortedSteps.push({ array: [...newArr], comparing: [j, j + 1] });
    }
    if (!swapped) break;
  }

  return sortedSteps;
}

// Event listener to start sorting
startSort.addEventListener("click", () => {
  const input = inputArray.value.split(",").map(Number);
  array = input;
  steps = bubbleSort(array);
  currentStep = 0;
  visualizeArray(steps[currentStep].array, steps[currentStep].comparing);
});

// Event listener for next step
nextStep.addEventListener("click", () => {
  if (currentStep < steps.length - 1) {
    currentStep++;
    visualizeArray(steps[currentStep].array, steps[currentStep].comparing);
  }
});

// Event listener for previous step
prevStep.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    visualizeArray(steps[currentStep].array, steps[currentStep].comparing);
  }
});
