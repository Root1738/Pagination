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

const searchList = () => {
  const studentSearchDiv = document.createElement('div');
  studentSearchDiv.className = 'student-search';
  pageHeader.appendChild(studentSearchDiv);

  const searchInput = document.createElement('input');
  searchInput.setAttribute('type', 'search');
  searchInput.setAttribute('placeholder', 'Student Name');
  studentSearchDiv.appendChild(searchInput);

  const button = document.createElement('button');
  button.setAttribute('type', 'submit');
  button.textContent = 'Search';
  studentSearchDiv.appendChild(button);
  studentSearchDiv.addEventListener('submit', (e) => {
    console.log('HELLO');
    e.preventDefault();
    const inputText = searchInput.value;
    searchInput.value = '';
  });
}

showPage(1, students);
appendPageLinks(students);
searchList();
// Default -> sets first page to active
document.querySelector('.pagination li a').className = 'active';
