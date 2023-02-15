const Factory = artifacts.require('Factory.sol');
const Router = artifacts.require('Router.sol');
const Pair = artifacts.require('Pair.sol');
const Token1 = artifacts.require('Token1.sol');
const Token2 = artifacts.require('Token2.sol');

module.exports = async done => {
  try {
    const [admin, _] = await web3.eth.getAccounts();
    const factory = await Factory.at('0x6725F303b657a9451d8BA641348b6761A6CC7a17'); //your deployed factory address
    const router = await Router.at('0xD99D1c33F9fC3444f8101754aBC46c52416550D1'); //your deployed router address
    const token1 = await Token1.new(); //your deployed token1 address
    const token2 = await Token2.new(); //your deployed token2 address
    const pairAddress = await factory.createPair.call(token1.address, token2.address);
    const tx = await factory.createPair(token1.address, token2.address);
    await token1.approve(router.address, 10000); //approve token1 amount to router
    await token2.approve(router.address, 10000);  // approve token2 amount to router
    await router.addLiquidity(
      token1.address, 
      token2.address,
      10000,  //token1 amount
      10000, //token2 amount
      10000, //token1 amount
      10000, //token2 amount
      admin, //to address
      Math.floor(Date.now() / 1000) + 60 * 10 //10 minutes
    );
    const pair = await Pair.at(pairAddress); //your deployed pair address
    const balance = await pair.balanceOf(admin);  //your balance of LP tokens
    console.log(`balance LP: ${balance.toString()}`); //print your balance of LP tokens
    } catch(e) {
      console.log(e);
    }
  done();
};
