import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms'

import {AutoCompleteModule} from 'primeng/autocomplete';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipsModule} from 'primeng/chips';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {KeyFilterModule} from 'primeng/keyfilter';
import {ListboxModule} from 'primeng/listbox';
import {MultiSelectModule} from 'primeng/multiselect';
import {PasswordModule} from 'primeng/password';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SliderModule} from 'primeng/slider';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import {ButtonModule} from 'primeng/button';
import {SplitButtonModule} from 'primeng/splitbutton';

import {DataViewModule} from 'primeng/dataview';
import {OrderListModule} from 'primeng/orderlist';
import {PaginatorModule} from 'primeng/paginator';
import {PickListModule} from 'primeng/picklist';
import {TableModule} from 'primeng/table';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {AccordionModule} from 'primeng/accordion';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {FieldsetModule} from 'primeng/fieldset';
import {PanelModule} from 'primeng/panel';
import {SplitterModule} from 'primeng/splitter';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {TabViewModule} from 'primeng/tabview';
import {ToolbarModule} from 'primeng/toolbar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {SidebarModule} from 'primeng/sidebar';
import {TooltipModule} from 'primeng/tooltip';
import {MenuModule} from 'primeng/menu';
import {ContextMenuModule} from 'primeng/contextmenu';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenubarModule} from 'primeng/menubar';
import {PanelMenuModule} from 'primeng/panelmenu';
import {SlideMenuModule} from 'primeng/slidemenu';
import {TabMenuModule} from 'primeng/tabmenu';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ToastModule} from 'primeng/toast';
import {DragDropModule} from 'primeng/dragdrop';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {BadgeModule} from 'primeng/badge';
import {BlockUIModule} from 'primeng/blockui';
import {CaptchaModule} from 'primeng/captcha';
import { ChipModule } from 'primeng/chip';
import {InplaceModule} from 'primeng/inplace';
import {ProgressBarModule} from 'primeng/progressbar';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SkeletonModule} from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import {DeferModule} from 'primeng/defer';
import {FocusTrapModule} from 'primeng/focustrap';
import {MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {CalendarModule} from 'primeng/calendar';
const modules: any[] = [  
  LayoutModule,
  ReactiveFormsModule,
 // FlexLayoutModule
 AutoCompleteModule,
 CheckboxModule,
 ChipsModule,
 DropdownModule,
 InputMaskModule,
 InputSwitchModule,
 InputTextModule,
 InputTextareaModule,
 InputNumberModule,
 KeyFilterModule,
 ListboxModule,
 MultiSelectModule,
 PasswordModule,
 RadioButtonModule,
 SliderModule,
 SelectButtonModule,
 ToggleButtonModule,
 TriStateCheckboxModule,
 ButtonModule,
 SplitButtonModule,
 DataViewModule,
 OrderListModule,
 PaginatorModule,
 PickListModule,
 TableModule,
 TreeModule,
 TreeTableModule,
 VirtualScrollerModule,
 AccordionModule,
 CardModule,
 DividerModule,
 FieldsetModule,
 PanelModule,
 SplitterModule,
 ScrollPanelModule,
 TabViewModule,
 ToolbarModule,
 ConfirmDialogModule,
 ConfirmPopupModule,
 DialogModule,
 DynamicDialogModule,
 OverlayPanelModule,
 SidebarModule,
 TooltipModule,
 MenuModule,
 ContextMenuModule,
 MegaMenuModule,
 MenubarModule,
 PanelMenuModule,
 SlideMenuModule,
 TabMenuModule,
 TieredMenuModule,
 MessagesModule,
 MessageModule,
 ToastModule,
 DragDropModule,
 AvatarModule,
 AvatarGroupModule,
 BadgeModule,
 BlockUIModule,
 CaptchaModule,
 ChipModule,
 InplaceModule,
 ProgressBarModule,
 ProgressSpinnerModule,
 ScrollTopModule,
 SkeletonModule,
 TagModule,
 DeferModule,
 FocusTrapModule,
 CalendarModule
];

@NgModule({
  imports: [ ...modules ],
  exports: [ ...modules ],
  providers: [DialogService,
    MessageService
  ]
})
export class PrimengModule { }
