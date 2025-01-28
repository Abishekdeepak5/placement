// theme.service.ts
import {Inject,Injectable,PLATFORM_ID } from '@angular/core';
import { DOCUMENT,isPlatformBrowser  } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
    constructor(@Inject(DOCUMENT) private document: Document,@Inject(PLATFORM_ID) private platformId: Object){}
  // private darkMode = false;
  darkSub: BehaviorSubject<boolean> = new BehaviorSubject(false);
  darkMode$=this.darkSub.asObservable();
  darkMode:boolean=false;
    toggleTheme(): void {
        this.darkMode = !this.darkMode;
        this.darkSub.next(this.darkMode);
        document.body.classList.toggle('dark-mode', this.darkMode);
        document.body.classList.toggle('light-mode', !this.darkMode);
        localStorage.setItem('darkMode', JSON.stringify(this.darkMode));
    }
    setInitialTheme(): void {
        if (isPlatformBrowser(this.platformId)) {
            const savedTheme = JSON.parse(localStorage.getItem('darkMode') || 'false');
            if (savedTheme) {
            this.setTheme(savedTheme);
            }
      } else {
        console.warn('localStorage is not available on the server');
      }
    }
    // setInitialTheme(): void {
    //     var localMode='false';
    //     try{
    //         localMode=(localStorage.getItem('darkMode')!=null?'false':localStorage.getItem('darkMode'));
    //     }catch{}
    //     console.log(localStorage.getItem('darkMode'));
    //     const savedTheme = JSON.parse( localStorage.getItem('darkMode') || 'false');
    //     this.setTheme(savedTheme);
    // }

    setTheme(isDark: boolean): void {
        this.darkMode = isDark;
        this.darkSub.next(this.darkMode);
        this.document.body.classList.toggle('dark-mode', this.darkMode);
        this.document.body.classList.toggle('light-mode', !this.darkMode);
    }

    isDarkMode(): boolean {
        return this.darkMode;
    }

}
