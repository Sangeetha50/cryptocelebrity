import { Injectable } from '@angular/core';
import Web3 from "web3";
import * as Tx from'ethereumjs-tx'

import { CookieService } from 'ngx-cookie-service';
import { Buffer } from "buffer";
import { promise } from 'protractor';
import { resolve } from 'dns';

let tokenAbi = require('./abicode.json');
@Injectable({
  providedIn: 'root'
})
export class ApicallsService {


  
  public _account: string = null;
  public account;
  public _web3: any;

  public private_keys:any;
  public _tokenContract: any;
  // public _tokenContractAddress: string = "0x7e6fc2332c31de8d27f8c4d5d9c49b99aac1304b"
  public _tokenContractAddress: string = "0xd4883dce784ba5c0d6edd0793271fab8854f18ef"
  constructor(private cookieService:CookieService) { 
     
    this._web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/WcU9XLzeETV17yiQYuRE ')); 
    // this._web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/Vr1GWcLG0XzcdrZHWMPu'));
     this._tokenContract = new this._web3.eth.Contract(tokenAbi,this._tokenContractAddress,{gaslimit:3000000});
  }



  setprivatekey(privatekeys: string) {
    localStorage.setItem('privatekeys', privatekeys);
  }

  getprivatekey() {
    return localStorage.getItem('privatekeys');
  }

  deleteprivatekey() {
    localStorage.removeItem('privatekeys');
  }


    
    public async transferOwnership(b,c){
      let instance = this;
      // this.private_keys=a;

      let a=instance.getprivatekey();
        var account_adddress=instance._web3.eth.accounts.privateKeyToAccount('0x'+a);
        var address=account_adddress["address"]
        instance._web3.eth.getTransactionCount(address,function(err,result){
          var nonce = result.toString(16);
          const private_key =Buffer.from(a,'hex');
          
          console.log(address)
          console.log(a);
          
          var contract_function = instance._tokenContract.methods.createPromoPerson(address,b,c)
          var contract_function_abi = contract_function.encodeABI();
          var txParams = {
            nonce: '0x'+nonce,
            gasPrice: '0x4A817C800',
            gasLimit: 4000000,
            from:address,
            to: instance._tokenContractAddress,
            value: '0x00',
            data: contract_function_abi,
            chainId: 3
          }
          var tx = new Tx(txParams);
          tx.sign(private_key);
          const serializedtx = tx.serialize();
          instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
            if(err != null){
              console.log("err")
            }
            else{
              console.log(result);
              alert("Successfully Created a token");
			      }
			  })
		  })
      
    }


    // public async tokensOfOwner(a){
    //   let instance = this;
    //   console.log("works");
      
    //   instance._tokenContract.methods.tokensOfOwner(a).call().then(res=>{
    //     alert(res)
    //     // console.log(res);
    //   })
    // }
    

    public async tokensOfOwner(a):Promise<object>{
      let instance = this;
      return new Promise((resolve, reject) => {
        let _web3 = this._web3;
        instance._tokenContract.methods.tokensOfOwner(a).call().then(res=>{
          
        // this.aaa=res;
          console.log(res);
          resolve(res)
        })
      })as Promise<object>;
  }
  
    // public async totalSupply(){
    //   let instance = this;
    //   console.log("works");
      
    //   instance._tokenContract.methods.totalSupply().call().then(res=>{
    //     alert(res)
    //     // console.log(res);
    //   })
    // }
    public async personIndexToApproved(a):Promise<object>{
      let instance = this;
      return new Promise((resolve, reject) => {
        let _web3 = this._web3;
        instance._tokenContract.methods.personIndexToApproved(a).call().then(res=>{
          
        // this.aaa=res;
          console.log(res);
          resolve(res)
        })
      })as Promise<object>;
  }


    public async totalSupply():Promise<object>{
      let instance = this;
      return new Promise((resolve, reject) => {
        let _web3 = this._web3;
        instance._tokenContract.methods.totalSupply().call().then(res=>{
          
        // this.aaa=res;
          console.log(res);
          resolve(res)
        })
      })as Promise<object>;
  }

  // public async balanceof(a){
  //   let instance = this;
  //   console.log("works");
  //   instance._tokenContract.methods.balanceOf(a).call().then(res=>{
  //     alert(res)
  //   // this.aaa=res;
  //     console.log(res);
  //   })
  // }



  public async balanceof(a):Promise<object>{
    let instance = this;
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      instance._tokenContract.methods.balanceOf(a).call().then(res=>{
        
      // this.aaa=res;
        console.log(res);
        resolve(res)
      })
    })as Promise<object>;
}

public async tokengetPerson(a):Promise<object>{
  let instance = this;
  return new Promise((resolve, reject) => {
    let _web3 = this._web3;
    instance._tokenContract.methods.getPerson(a).call().then(res=>{
      
    // this.aaa=res;
      console.log(res);
      resolve(res)
    })
  })as Promise<object>;
}

public async current_ceo():Promise<object>{
  let instance = this;
  return new Promise((resolve, reject) => {
    let _web3 = this._web3;
    instance._tokenContract.methods.ceoAddress().call().then(res=>{
      
    // this.aaa=res;
      console.log(res);
      resolve(res)
    })
  })as Promise<object>;
}
public async current_coo():Promise<object>{
  let instance = this;
  return new Promise((resolve, reject) => {
    let _web3 = this._web3;
    instance._tokenContract.methods.cooAddress().call().then(res=>{
      
    // this.aaa=res;
      console.log(res);
      resolve(res)
    })
  })as Promise<object>;
}

  // public  async tokengetPerson(a){
  //   let instance = this;
  //   instance._tokenContract.methods.getPerson(a).call().then(res=>{
  //     console.log(res);
      
  //     for(var i=0;i<=res.length;i++) {
  //       alert(res[i]);
  //     }
    

  //   })
  // }

  public async tokenownerOf(a){
    let instance = this;
    instance._tokenContract.methods.ownerOf(a).call().then(res=>{
      console.log(res);
      alert(res)

    })
  }

  public async tokentokensOfOwner(a){
    let instance = this;
    instance._tokenContract.methods.tokensOfOwner(a).call().then(res=>{
      console.log(res);
      alert(res)

    })
  }
  public async tokenname(){
    let instance = this;
    instance._tokenContract.methods.name().call().then(res=>console.log(res))
  }

  public async tokenpriceOf(a){
    let instance = this;
    instance._tokenContract.methods.priceOf(a).call().then(res=>console.log(res))
  }

  public async tokensymbol(){
    let instance = this;
    instance._tokenContract.methods.symbol().call().then(res=>console.log(res))
  } 


  public async tokentotalSupply(){
    let instance = this;
    instance._tokenContract.methods.totalSupply().call().then(res=>console.log(res))
  }

  // public async setceo(a){
  //   let instance = this;
  //   instance._tokenContract.methods.setCEO(a).then(res=>console.log(res))
  // }
  // public async setcoo(a){
  //   let instance = this;
  //   instance._tokenContract.methods.setCOO(a).then(res=>console.log(res))
  // }

  public async tokenapprovesetceo(a,b){
    let instance = this;
     
        var account_adddress=instance._web3.eth.accounts.privateKeyToAccount('0x'+a);
        var address=account_adddress["address"]
        instance._web3.eth.getTransactionCount(address,function(err,result){
          var nonce = result.toString(16);
          const private_key =Buffer.from(a,'hex');
          
          console.log(address)
          console.log(a);
          
          var contract_function = instance._tokenContract.methods.setCEO(b)
          var contract_function_abi = contract_function.encodeABI();
          var txParams = {
            nonce: '0x'+nonce,
            gasPrice: '0x4A817C800',
            gasLimit: 4000000,
            from:address,
            to: instance._tokenContractAddress,
            value: '0x00',
            data: contract_function_abi,
            chainId: 3
          }
          var tx = new Tx(txParams);
          tx.sign(private_key);
          const serializedtx = tx.serialize();
          instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
            if(err != null){
              console.log("err")
            }
            else{
				      console.log('hast\t'+result);
			      }
			  })
      })
    }

    public async tokenapprovesetcoo(a){
      let instance = this;
       
          var account_adddress=instance._web3.eth.accounts.privateKeyToAccount('0x'+a);
          var address=account_adddress["address"]
          instance._web3.eth.getTransactionCount(address,function(err,result){
            var nonce = result.toString(16);
            const private_key =Buffer.from(a,'hex');
            
            console.log(address)
            console.log(a);
            
            var contract_function = instance._tokenContract.methods.setCOO(address)
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x'+nonce,
              gasPrice: '0x4A817C800',
              gasLimit: 4000000,
              from:address,
              to: instance._tokenContractAddress,
              value: '0x00',
              data: contract_function_abi,
              chainId: 3
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize();
            instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
              }
              else{
                console.log('hast\t'+result);
              }
          })
        })
      }

  public async tokenapprove(addt,id){
    // let instance = this
    // instance._tokenContract.methods.approve(addt,id).then(res=>console.log(res))
    let instance = this;
       let a = instance.getprivatekey()
          var account_adddress=instance._web3.eth.accounts.privateKeyToAccount('0x'+a);
          var address=account_adddress["address"]
          instance._web3.eth.getTransactionCount(address,function(err,result){
            var nonce = result.toString(16);
            const private_key =Buffer.from(a,'hex');
            
            console.log(address)
            console.log(a);
            
            var contract_function = instance._tokenContract.methods.approve(addt,id)
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x'+nonce,
              gasPrice: '0x4A817C800',
              gasLimit: 4000000,
              from:address,
              to: instance._tokenContractAddress,
              value: '0x00',
              data: contract_function_abi,
              chainId: 3
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize();
            instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
              }
              else{
                console.log('hast\t'+result);
              }
          })
        })
  }

  public async tokentakeOwnership(key,id){
    // let instance = this
    // instance._tokenContract.methods.takeOwnership(id).then(res=>console.log(res))
    let instance = this;
       let a = key
          var account_adddress=instance._web3.eth.accounts.privateKeyToAccount('0x'+a);
          var address=account_adddress["address"]
          instance._web3.eth.getTransactionCount(address,function(err,result){
            var nonce = result.toString(16);
            const private_key =Buffer.from(a,'hex');
            
            console.log(address)
            console.log(a);
            
            var contract_function = instance._tokenContract.methods.takeOwnership(id)
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x'+nonce,
              gasPrice: '0x4A817C800',
              gasLimit: 4000000,
              from:address,
              to: instance._tokenContractAddress,
              value: '0x00',
              data: contract_function_abi,
              chainId: 3
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize();
            instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
              }
              else{
                console.log('hast\t'+result);
              }
          })
        })
  }

  public async tokentransferFrom(addf,addt,id){
    // let instance = this
    // instance._tokenContract.methods.takeOwnership(addf,addt,id).then(res=>console.log(res))
    let instance = this;
       let a = addf;
          var account_adddress=instance._web3.eth.accounts.privateKeyToAccount('0x'+a);
          var address=account_adddress["address"]
          instance._web3.eth.getTransactionCount(address,function(err,result){
            var nonce = result.toString(16);
            const private_key =Buffer.from(a,'hex');
            
            console.log(address)
            console.log(a);
            
            var contract_function = instance._tokenContract.methods.transferFrom(address,addt,id)
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x'+nonce,
              gasPrice: '0x4A817C800',
              gasLimit: 4000000,
              from:address,
              to: instance._tokenContractAddress,
              value: '0x00',
              data: contract_function_abi,
              chainId: 3
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize();
            instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
              }
              else{
                console.log('hast\t'+result);
              }
          })
        })
  }

  public async tokentransfer(addt,id){
    // let instance = this
    // instance._tokenContract.methods.transfer(addt,id).then(res=>console.log(res))

    let instance = this;
       let a = instance.getprivatekey()
          var account_adddress=instance._web3.eth.accounts.privateKeyToAccount('0x'+a);
          var address=account_adddress["address"]
          instance._web3.eth.getTransactionCount(address,function(err,result){
            var nonce = result.toString(16);
            const private_key =Buffer.from(a,'hex');
            
            console.log(address)
            console.log(a);
            
            var contract_function = instance._tokenContract.methods.transfer(addt,id)
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x'+nonce,
              gasPrice: '0x4A817C800',
              gasLimit: 4000000,
              from:address,
              to: instance._tokenContractAddress,
              value: '0x00',
              data: contract_function_abi,
              chainId: 3
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize();
            instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
              }
              else{
                console.log('hast\t'+result);
              }
          })
        })
  }

  

  public async tokencreateContractPerson(name){
    // let instance = this;
    // instance._tokenContract.methods.createContractPerson(name).then(res=>console.log(res))

    let instance = this;
       let a = this.getprivatekey()
          var account_adddress=instance._web3.eth.accounts.privateKeyToAccount('0x'+a);
          var address=account_adddress["address"]
          instance._web3.eth.getTransactionCount(address,function(err,result){
            var nonce = result.toString(16);
            const private_key =Buffer.from(a,'hex');
            
            console.log(address)
            // console.log(a);
            
            var contract_function = instance._tokenContract.methods.createContractPerson(name)
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x'+nonce,
              gasPrice: '0x4A817C800',
              gasLimit: 4000000,
              from:address,
              to: instance._tokenContractAddress,
              value: '0x00',
              data: contract_function_abi,
              chainId: 3
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize();
            instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
              }
              else{
                console.log('hast\t'+result);
              }
          })
        })

  }

  public async tokenpurchase(key,id,values){
    let instance = this;
       let a = key
          var account_adddress=instance._web3.eth.accounts.privateKeyToAccount('0x'+a);
          var address=account_adddress["address"]
          instance._web3.eth.getTransactionCount(address,function(err,result){
            var nonce = result.toString(16);
            const private_key =Buffer.from(a,'hex');
            
            console.log(address)
            // console.log(a);
            
            var contract_function = instance._tokenContract.methods.purchase(id)
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x'+nonce,
              gasPrice: '0x4A817C800',
              gasLimit: 4000000,
              from:address,
              to: instance._tokenContractAddress,
              value:values*1000000000000000000,
              data: contract_function_abi,
              chainId: 3
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize();
            instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
              }
              else{
                console.log('hast\t'+result);
              }
          })
        })
    }

    public async tokenpayout(add){
      let instance = this;
       let a = instance.getprivatekey()
          var account_adddress=instance._web3.eth.accounts.privateKeyToAccount('0x'+a);
          var address=account_adddress["address"]
          instance._web3.eth.getTransactionCount(address,function(err,result){
            var nonce = result.toString(16);
            const private_key =Buffer.from(a,'hex');
            
            console.log(address)
            // console.log(a);
            
            var contract_function = instance._tokenContract.methods.payout(add)
            var contract_function_abi = contract_function.encodeABI();
            var txParams = {
              nonce: '0x'+nonce,
              gasPrice: '0x4A817C800',
              gasLimit: 4000000,
              from:address,
              to: instance._tokenContractAddress,
              value:'0x00',
              data: contract_function_abi,
              chainId: 3
            }
            var tx = new Tx(txParams);
            tx.sign(private_key);
            const serializedtx = tx.serialize();
            instance._web3.eth.sendSignedTransaction('0x'+serializedtx.toString('hex'),function(err,result){
              if(err != null){
                console.log("err")
              }
              else{
                console.log('hast\t'+result);
              }
          })
        })
    }

    

}