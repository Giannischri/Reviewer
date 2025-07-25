import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {

  searchTerm: string = '';

  onSearch(): void {
    console.log('Search term:', this.searchTerm);
    // Implement your filtering or API call logic here
  }

}
