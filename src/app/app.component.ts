import { Component } from '@angular/core';
import Web3 from 'web3'
import * as Tx from'ethereumjs-tx'
import { ApicallsService } from './service/apicalls.service'
import { Buffer } from "buffer";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  public aaa:any;
  public tot:any;
  public detail:any;
  public approvee:any;
  public approveee:any;
  public ceoadd:any;
  public cooadd:any;
  public arr=[];
  public from_balance:any;
  public to_balance:any;
  public _web3:any;
  public getid:any;
  constructor(private api:ApicallsService){
    this._web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/Vr1GWcLG0XzcdrZHWMPu'));
    // this.api.getAccount().then(res=>console.log(res))
   
  }
  totalSupply() {
    this.api.totalSupply().then(res=>{
      //  console.log(res+"balanceof function");
       this.tot=res;
        console.log(res)
      })
  }
  createToken(a,b,c){
    // this.api.set_cookie(a);
    console.log(a,b,c);
    this.api.setprivatekey(a)
    this.api.transferOwnership(b,c).then(res=>{
      
    })
  }
  approval(a) {
    this.api.personIndexToApproved(a).then(res=>{
      //  console.log(res+"balanceof function");
       this.approvee=res;
        console.log(res)
      })
    
  }
  

  current_ceo(){
    this.api.current_ceo().then(res=>{
    //  console.log(res+"balanceof function");
     this.ceoadd=res;
      console.log(res);
    })
   
  }
  current_coo(){
    this.api.current_coo().then(res=>{
    //  console.log(res+"balanceof function");
     this.cooadd=res;
      console.log(res);
    })
   
  }

  blanceof(a){
    this.api.balanceof(a).then(res=>{
    //  console.log(res+"balanceof function");
     this.aaa=res
      console.log(res)
    })
    this.api.tokenname()
    this.api.tokensymbol()
  
    this.api.tokenpriceOf(0)
  }
  numberoftoken(a){
    this.api.tokensOfOwner(a).then(res=>{
      //  console.log(res+"balanceof function");
       this.getid=res
        console.log(res)
      })
  }
  tokendetails(a){
    this.api.tokengetPerson(a).then(res=>{

      this.detail=res
       console.log(res)
        console.log(res['personName'],res['sellingPrice'],res['owner']) ;       // for(var i=0;i<Object.keys.length;i++) {
               console.log(res[i]);
                for(var i=0;i<Object.keys.length;i++) {
                
                this.arr.push({'personName':res['personName'],'sellingPrice':res['sellingPrice'],'owner':res['owner']})

                }
              })
  }
  setceos(a,b){
    console.log(a,b);
    
    this.api.tokenapprovesetceo(a,b)
  }
  setcoos(a){
   this.api.tokenapprovesetcoo(a)
  }

  createcontract(name){
    this.api.tokencreateContractPerson(name)
  }

  approve(addt,id){
    this.api.tokenapprove(addt,id).then(res=>{
      //  console.log(res+"balanceof function");
       this.approveee=res;
        console.log(res)
      })
  }

  transfer(tto,tid){
    this.api.tokentransfer(tto,tid)
  }

  transferFrom(fd,tato,taid){
    this.api.tokentransferFrom(fd,tato,taid)
  }

  takeOwnership(key,kid){
    this.api.tokentakeOwnership(key,kid)
  }

  purchase(key,id,value){
    this.api.tokenpurchase(key,id,value)
  }
  payout(add){
      this.api.tokenpayout(add)
  }
  
}