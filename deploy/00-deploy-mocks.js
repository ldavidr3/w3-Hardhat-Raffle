const { network } = require("hardhat")

const BASE_FEE = ethers.utils.parseEther("0.25") // This is the premium: It cost 0.25 LINK per request

const GAS_PRICE_LINK = 1e9 // LINK PER GAS. CALCULATED VALUE BASED ON THE GAS PRICE OF THE CHAIN

module.exports = async function ({ getNamedAccounts, deployments }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId
    const args = [BASE_FEE, GAS_PRICE_LINK]

    if (chainId == 31337) {
        log("local Network detected. Deploying Mock Coordinator...")

        await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocks deployed...")
        log("-----------------------")
    }
}

module.exports.tags = ["all", "mocks"]
