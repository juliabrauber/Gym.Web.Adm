import { 
  Component, 
  OnInit
} from '@angular/core';
import { 
  select, 
  Store
} from '@ngrx/store';

import { AppState } from 'src/app/shared/store/models/app.state';
import { ErrorState } from 'src/app/shared/store/models/error.state';
import { selectError } from 'src/app/shared/store/selectors/error.selectors';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.less']
})
export class ErrorComponent implements OnInit {

  model: ErrorState;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(selectError))
    .subscribe(data => {
      this.model = data;
    });
  }

}
