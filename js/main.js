const fullPage = document.querySelector('.page');
const uStudentList = document.querySelector('.student-list');
const students = uStudentList.children;
const itemsPerPage = 10;

const showPage = (pageNumber, students) => {
  // Setting default display to 'none'
  for (let i = 0; i < students.length; i += 1) {
    students[i].style.display = 'none';
      // if student index falls on pageNumber * 10, display them
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

  paginationList.addEventListener('click', (e) => {
    console.log(event.target.tagName);
    if (e.target.tagName === 'A') {
      // pageNumber = a.textContent
      const pageNumber = event.target.textContent;
      // removing all .active classes before assigning a new .active class
      for (let i = 0; i < totalPages; i += 1) {
        const anchorList = document.querySelectorAll('.pagination li a');
        anchorList[i].classList.remove('active');
      }
      // setting clicked pageNumber to active
      e.target.className = 'active';
      showPage(pageNumber, students);
    }
  });
}

showPage(1, students);
appendPageLinks(students);

// Default -> sets first page to active
document.querySelector('.pagination li a').className = 'active';
