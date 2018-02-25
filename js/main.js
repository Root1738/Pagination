// variable declaration
const fullPage = document.querySelector('.page');
const pageHeader = document.querySelector('.page-header');
const uStudentList = document.querySelector('.student-list');
const students = uStudentList.children;
const itemsPerPage = 10;

const showPage = (pageNumber, students) => {
  // Setting default display to 'none'
  for (let i = 0; i < students.length; i += 1) {
    students[i].style.display = 'none';
      // if student index falls on correct pageNumber, display those students
      if (i < pageNumber * itemsPerPage && i >= (pageNumber - 1) * itemsPerPage) {
        students[i].style.display = 'block';
      }
  }
}

const appendPageLinks = students => {
  const totalPages = Math.ceil(students.length / itemsPerPage);
  // Creating a pagination Div and appending it.
  const paginationDiv = document.createElement('div');
  fullPage.appendChild(paginationDiv);
  paginationDiv.className = 'pagination';

  // Creating an unordered list
  const paginationList = document.createElement('ul');
  paginationDiv.appendChild(paginationList);

  // Creating & appending anchor list items to pagination list
  for (let i = 1; i < totalPages + 1; i += 1) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = i.toString();
    a.href = '#';
    li.appendChild(a);
    paginationList.appendChild(li);
  }

  // Adding event Listener to the pagination unordered list
  paginationList.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      // pageNumber = a.textContent
      const pageNumber = event.target.textContent;

      // Removing all .active classes before assining a new .active class
      removeActiveClass(totalPages);

      // setting clicked pageNumber to active
      e.target.className = 'active';
      showPage(pageNumber, students);
    }
  });
}

const removeActiveClass = (totalPages) => {
  // removing all .active classes
  for (let i = 0; i < totalPages; i += 1) {
    const anchorList = document.querySelectorAll('.pagination li a');
    anchorList[i].classList.remove('active');
  }
}

const searchList = (students) => {
  // creating a search form & appending it
  const studentSearchForm = document.createElement('form');
  studentSearchForm.className = 'student-search';
  pageHeader.appendChild(studentSearchForm);
  // creating search input & appending it
  const searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'search');
  searchInput.setAttribute('placeholder', 'Student Name');
  studentSearchForm.appendChild(searchInput);
  // creating a submit button and appending it
  const button = document.createElement('button');
  button.setAttribute('type', 'submit');
  button.textContent = 'Search';
  studentSearchForm.appendChild(button);

  // adding submit handler to form to listen to the button & input
  studentSearchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value;
    searchInput.value = '';
    const paginationDiv = document.querySelector('.pagination');
    console.log(paginationDiv);

    // if paginationDIV is not already removed (NULL), which will happen
    // when previous search results are < 10
    // then remove it
    if (paginationDiv !== null) {
      fullPage.removeChild(paginationDiv);
    }

    // creating an empty array to hold searched students
    const resultsArr = [];

      // traversing over each student
      for (let i = 0; i < students.length; i += 1) {
        // name set to h3 text
        const name = students[i].querySelector('h3').textContent;
        // email to sent to span text
        const email = students[i].querySelector('span').textContent;

        // if name  or email contains user's search
        // add student to new array
        if (name.indexOf(inputText) > -1 || email.indexOf(inputText) > -1) {
          resultsArr.push(students[i]);
        }
      }
      // hiding every student
      for (let i = 0; i < students.length; i += 1) {
          students[i].style.display = 'none';
      }
      if (resultsArr.length === 0) {
        alert('No matched students!!');
        // if more then 10 students
        // append corrext # of pages
        // show page 1 and set class to active
      } else if (resultsArr.length > 10) {
        appendPageLinks(resultsArr);
        showPage(1, resultsArr);
        document.querySelector('.pagination li a').className = 'active';
      } else {
        // else if results > 0 & < 10
        // show them without creating page links
        for (let i = 0; i < resultsArr.length; i += 1) {
          resultsArr[i].style.display = '';
        }
      }

  });
}
// default function calls
showPage(1, students);
appendPageLinks(students);
searchList(students);
// Default -> sets first page to active
document.querySelector('.pagination li a').className = 'active';
