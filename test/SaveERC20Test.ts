
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import {expect, assert} from "chai";


describe("Test saveERC20", function(){

    let face;
    async function deploySaveERC20(){
        const[owner, firstA, secondA] = await ethers.getSigners();

        const MyToken = await ethers.getContractFactory("MyToken");
        const myToken = await MyToken.deploy();


        const SaveERC20 = await ethers.getContractFactory("SaveERC20");
        const saveERC20 = await SaveERC20.deploy(myToken.target);


        return {saveERC20, owner, myToken, firstA, secondA};
    }

    describe("Confirm deploy", function(){
        it("", async function(){
            const{saveERC20} = await loadFixture(deploySaveERC20);
            assert.isNotNull(saveERC20);
        })
    });


    describe("test deposit", function(){
        it("test that deposit amount is the actual amount", async function(){
            const {myToken, owner, saveERC20} = await loadFixture(deploySaveERC20);
            await myToken.approve(saveERC20.target, 2000);

            await saveERC20.deposit(1000);

            const bal = await saveERC20.checkUserBalance(owner.address);
            
            expect(bal).to.be.equal(1000);
        });
        it("test that deposit of zero token is not allowed", async function(){
            const {myToken, saveERC20} = await loadFixture(deploySaveERC20);

            await myToken.approve(saveERC20.target, 1000);

            // expect().to.emit

            expect(saveERC20.deposit(0)).to.be.rejectedWith("can't save zero value");
        });

        it("test that ")
    })

})