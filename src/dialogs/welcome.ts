import { EditPerson } from './edit-person';
import { DialogService } from 'aurelia-dialog';
import { autoinject } from 'aurelia-framework';

@autoinject
export class Welcome {
  constructor(private dialogService: DialogService) {
  }
  person = { firstName: 'Wade', middleName: 'Owen', lastName: 'Watts' };
  submit() {
    this.dialogService.open({ viewModel: EditPerson, model: this.person, lock: false }).whenClosed(response => {
      if (!response.wasCancelled) {
        console.log('good - ', response.output);
      } else {
        console.log('bad');
      }
      console.log(response.output);
    });
  }
}
