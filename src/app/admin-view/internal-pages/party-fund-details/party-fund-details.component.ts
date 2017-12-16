import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FundDetails } from 'app/admin-view/models/fundDetails';
import { PartyServiceService } from 'app/admin-view/shared/party-service.service';
import { Router } from '@angular/router';
import { ResultData } from 'app/admin-view/models/result';

@Component({
  selector: 'app-party-fund-details',
  templateUrl: './party-fund-details.component.html',
  styleUrls: ['./party-fund-details.component.scss']
})
export class PartyFundDetailsComponent implements OnInit {

  isEditable: boolean;
  fundDetails: FundDetails[] = new Array<FundDetails>();
  titleAlert = 'This field is required';
  fundDetail: FundDetails;
  partyFundCollection: FormGroup;
  result: ResultData[];

  constructor(private _fb: FormBuilder, private _partyService: PartyServiceService,
    private router: Router) {
    this.fundDetails = this._partyService.partyFundArray;
  }

  ngOnInit() {
    this.isEditable = false;
    let data = this._partyService.storageEl;
    if (data) {
      this.isEditable = true;
      this.formInit(data);
    } else {
      this.isEditable = false;
    this.formInit({});
  }
}

  formInit(fundData) {
    this.partyFundCollection = this._fb.group({
      FundID: [fundData.FundID || ''],
      Date: [fundData.Date || '', Validators.required],
      FundType: [fundData.FundType || '', Validators.required],
      PaidBy: [fundData.PaidBy || '', Validators.required],
      Amount: [fundData.Amount || '', Validators.required],
      CheckNo: [fundData.CheckNo || ''],
      ProviderBankName: [fundData.ProviderBankName || '', Validators.required],
      ProviderName: [fundData.ProviderName || '', Validators.required],
      ProviderMobileNo: [fundData.ProviderMobileNo || '', Validators.required],
      Address: [fundData.Address || '', Validators.required],
      IsActive: [fundData.IsActive || ''],
      MobileNo: [fundData.MobileNo || ''],
      TokenId: [fundData.TokenId || ''],
      MobId: [fundData.MobId || '']
    });
  }

  insertPartyFundDetail(fundDetails) {
    if (fundDetails.FundID == '' || fundDetails.FundID == null) {
      fundDetails.MobileNo = '7741909862';
      fundDetails.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
      fundDetails.MobId = '0';
      fundDetails.IsActive = 1;
      this._partyService.addPartyFundDetails(fundDetails).subscribe(data => {
        this.result = data;
        if (this.result[0].Status == '106') {
          swal({title: 'Success!!!',
                text: 'Party Fund Data Inserted Successfully!!!',
                icon: 'success'}).then((value) => {
                  if (value) {
                    this.router.navigateByUrl('/pages/partyfundtable');
                  }
                });
                this.partyFundCollection.reset();
        } else {
          swal('Sorry!!!', 'Party Fund Data Insertion Failed!!!', 'error');
        }
      });
    } else {
      fundDetails.MobileNo = '7741909862';
      fundDetails.TokenId = 'D29D522E-F95B-4191-BF73-440C196177B1';
      console.log(fundDetails);
      this._partyService.addPartyFundDetails(fundDetails).subscribe(data => {
        this.result = data;
        if (this.result[0].Status == '106') {
          swal({title: 'Success!!!',
                text: 'Party Fund Data Updated Successfully!!!',
                icon: 'success'}).then((value) => {
                  if (value) {
                    this.router.navigateByUrl('/pages/partyfundtable');
                  }
                });
                this.partyFundCollection.reset();
        } else {
          swal('Sorry!!!', 'Party Fund Data Updation Failed!!!', 'error');
        }
      });
    }
  }

  // editFund(fundId: number) {
  //   this.fundDetail = this._partyService.editFundData(fundId);
  //   if (this.fundDetail != null){
  //     window.alert('Data Found!!!!');
  //     this.formInit(this.fundDetail);
  //     this.isEditable = true;
  //   } else {
  //     window.alert('No Data Found!!!!');
  //   }
  // }

  activateFund(fundId: number) {
    this.fundDetail = this._partyService.editFundData(fundId);
    if (this.fundDetail != null) {
      if (this.fundDetail.IsActive == 0) {
        this.fundDetail.IsActive = 1;
      } else {
        this.fundDetail.IsActive = 0;
      }
    }
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  cancelData() {
    this.router.navigateByUrl('/pages/partyfundtable');
  }
}

