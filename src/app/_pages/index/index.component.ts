import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MapboxService } from 'src/app/_services/mapbox.service';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  lat: number;
  lng: number;
  loading = false;
  showSearch = false;
  searchForm: FormGroup;
  addresses: any[] = [];
  constructor(
    private mapbox: MapboxService,
    private route: ActivatedRoute,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      addressInput: null
    });
    this.searchForm
      .get('addressInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.loading = true),
        switchMap(value => this.mapbox.getAddress(value).pipe(finalize(() => this.loading = false)))
      )
      .subscribe(address => {
        this.addresses = address["features"];
      });
    this.route.params.subscribe(parms => {
      this.lat = +parms.lat;
      this.lng = +parms.lng;
    });
    this.mapbox.getPoligon().subscribe(features => {
      this.mapbox.buildMap(this.lat, this.lng, features);
    });
  }
  openSearch() {
    this.showSearch = true;
  }

  selected(event) {
    this.mapbox.changeMarker(event.option.value.geometry.coordinates);
  }

  closeSearch() {
    this.searchForm.get('addressInput').setValue('');
    this.showSearch = false;

  }

  displayFn(address: any) {
    if (address) { return address.place_name }
  }
}
