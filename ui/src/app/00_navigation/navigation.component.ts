import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {MenuItem} from 'primeng/api';
import { AuthService } from '@app/core/services/auth.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnDestroy{
  mobileQuery: MediaQueryList;
  items: MenuItem[]=[];
  showSideBar:boolean=false;
  ngOnInit() {
    this.items=menuItems;
  }      
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, 
      media: MediaMatcher,
      private auth: AuthService) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  authenticated(): boolean {
    let isAuthenticated=this.auth.authenticated();
    return isAuthenticated==undefined?false:isAuthenticated;
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  account() {
    this.auth.account();
  }
  toggleSideBar() {
    this.showSideBar = this.showSideBar?false:true;
  }
}

const  menuItems = [
    {
        label:'File',
        icon:'pi pi-fw pi-file',
        items:[
            {
                label:'New',
                icon:'pi pi-fw pi-plus',
                items:[
                {
                    label:'Bookmark',
                    icon:'pi pi-fw pi-bookmark'
                },
                {
                    label:'Video',
                    icon:'pi pi-fw pi-video'
                },

                ]
            },
            {
                label:'Delete',
                icon:'pi pi-fw pi-trash'
            },
            {
                separator:true
            },
            {
                label:'Export',
                icon:'pi pi-fw pi-external-link'
            }
        ]
    },
    {
        label:'Edit',
        icon:'pi pi-fw pi-pencil',
        items:[
            {
                label:'Left',
                icon:'pi pi-fw pi-align-left'
            },
            {
                label:'Right',
                icon:'pi pi-fw pi-align-right'
            },
            {
                label:'Center',
                icon:'pi pi-fw pi-align-center'
            },
            {
                label:'Justify',
                icon:'pi pi-fw pi-align-justify'
            },

        ]
    },
    {
        label:'Users',
        icon:'pi pi-fw pi-user',
        items:[
            {
                label:'New',
                icon:'pi pi-fw pi-user-plus',

            },
            {
                label:'Delete',
                icon:'pi pi-fw pi-user-minus',

            },
            {
                label:'Search',
                icon:'pi pi-fw pi-users',
                items:[
                {
                    label:'Filter',
                    icon:'pi pi-fw pi-filter',
                    items:[
                        {
                            label:'Print',
                            icon:'pi pi-fw pi-print'
                        }
                    ]
                },
                {
                    icon:'pi pi-fw pi-bars',
                    label:'List'
                }
                ]
            }
        ]
    },
    {
        label:'Events',
        icon:'pi pi-fw pi-calendar',
        items:[
            {
                label:'Edit',
                icon:'pi pi-fw pi-pencil',
                items:[
                {
                    label:'Save',
                    icon:'pi pi-fw pi-calendar-plus'
                },
                {
                    label:'Delete',
                    icon:'pi pi-fw pi-calendar-minus'
                },

                ]
            },
            {
                label:'Archieve',
                icon:'pi pi-fw pi-calendar-times',
                items:[
                {
                    label:'Remove',
                    icon:'pi pi-fw pi-calendar-minus'
                }
                ]
            }
        ]
    },
    {
        label:'Quit',
        icon:'pi pi-fw pi-power-off'
    }
];