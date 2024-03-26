import { Component } from '@angular/core';
import { faBookJournalWhills, faCircleNodes, faCloudDownload, faCoffee, faDashboard, faGlobe, faHouse, faNetworkWired, faTable } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-homecomponent',
  templateUrl: './homecomponent.component.html',
  styleUrls: ['./homecomponent.component.css']
})
export class HomecomponentComponent {
  house = faHouse;
  table = faCircleNodes;
  browser = faGlobe;
  addButton = faHouse

}
