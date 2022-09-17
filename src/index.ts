import { initializeKeypair } from "./initializeKeypair"
import * as web3 from "@solana/web3.js"

async function sayHello(
  connection: web3.Connection,
  payer: web3.Keypair
): Promise<web3.TransactionSignature> {
  const transaction = new web3.Transaction()

  const instruction = new web3.TransactionInstruction(
    {
      keys: [],
      programId: new web3.PublicKey('Fyk7KDikabboHsen2ovSE6mt4hcXqAVk1GZXjdrRPRNu')
    }
  )

  transaction.add(instruction)

  const txSig = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [payer]
  )

  return txSig
}

async function main() {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"))
  const user = await initializeKeypair(connection)

  console.log("PublicKey:", user.publicKey.toBase58())

  const txSig = await sayHello(
    connection,
    user
  )

  console.log(
    `Transaction: https://explorer.solana.com/tx/${txSig}?cluster=devnet`
  )
}

main()
  .then(() => {
    console.log("Finished successfully")
    process.exit(0)
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
