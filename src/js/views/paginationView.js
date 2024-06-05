import View from './view';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  // here in 'paginationView' we just get the information on the click and send the result to controller handle it
  _addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto; // '+' convert to number
      handler(goToPage);
    });
  }
  _generateMarkupBtnPrev(curPage) {
    return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
        </button>
      `;
  }
  _generateMarkupBtnNext(curPage) {
    return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${curPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
  }
  _generateMarkup() {
    const curPage = this._data.page;
    // Scenarios
    // 1º - how many pages there are
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupBtnNext(curPage);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupBtnPrev(curPage);
    }

    // Other page

    if (curPage < numPages) {
      return `${this._generateMarkupBtnPrev(curPage)}
              ${this._generateMarkupBtnNext(curPage)}
      `;
    }
    return '';
  }

  // Page 1 and there are NO other pages
}

export default new PaginationView();
