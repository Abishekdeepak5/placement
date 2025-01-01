import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/service/theme.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  constructor(private themeService: ThemeService) { this.themeService.setInitialTheme();}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
  ngOnInit(){ 
       
  }
}
