const { ethers, network } = require("hardhat")
const fs = require("fs")

const FRONT_END_ADDRESSESS_FILE = "../nextjs-lottery-2/constants/contractAddresses.json"

const FRONT_END_ABI_FILE = "../nextjs-lottery-2/constants/abi.json"

module.exports = async () => {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating frontEnd----")
        updateContractAddresses()
        updateAbi()
    }
}

async function updateAbi() {
    const RAFFLE = await ethers.getContract("Raffle")
    fs.writeFileSync(FRONT_END_ABI_FILE, RAFFLE.interface.format(ethers.utils.FormatTypes.json))
}
async function updateContractAddresses() {
    const RAFFLE = await ethers.getContract("Raffle")
    const chainId = network.config.chainId.toString()
    const currentAddresses = JSON.parse(fs.readFileSync(FRONT_END_ADDRESSESS_FILE, "utf-8"))

    if (network.config.chainId.toString() in currentAddresses) {
        if (!currentAddresses[chainId].includes(RAFFLE.address)) {
            currentAddresses[chainId].push(RAFFLE.address)
        }
    }
    {
        currentAddresses[chainId] = [RAFFLE.address]
    }
    fs.writeFileSync(FRONT_END_ADDRESSESS_FILE, JSON.stringify(currentAddresses))
}

module.exports.tags = ["all", "frontend"]
