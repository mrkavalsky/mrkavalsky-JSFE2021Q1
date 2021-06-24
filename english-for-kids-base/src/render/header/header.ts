import './header.css';

export const renderHeader = (): void => {
  const header = document.createElement('header');

  header.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand navbar-brand_pointer">English For Kids</a>
        <div class="form-check form-switch">
          <input class="form-check-input" role="button" type="checkbox" id="flexSwitchCheckDefault">
          <label class="form-check-label form-check-label_1-5rem ms-1" for="flexSwitchCheckDefault">Train</label>
        </div>
        <button class="navbar-toggler"
                id="menu-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarColor01"
                aria-controls="navbarColor01"
                aria-expanded="false"
                aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  `;

  document.body.append(header);
};
