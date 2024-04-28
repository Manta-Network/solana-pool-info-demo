import RaydiumSwap from "./RaydiumSwap";

import "dotenv/config";
import { swapConfig } from "./swapConfig"; // Import the configuration

/**
 * Performs a token swap on the Raydium protocol.
 * Depending on the configuration, it can execute the swap or simulate it.
 */
const poolInfo = async () => {
  /**
   * The RaydiumSwap instance for handling swaps.
   */
  console.log(
    "process.env.RPC_URL, process.env.WALLET_PRIVATE_KEY",
    process.env.RPC_URL,
    process.env.WALLET_PRIVATE_KEY
  );
  const raydiumSwap = new RaydiumSwap(
    process.env.RPC_URL,
    process.env.WALLET_PRIVATE_KEY
  );
  console.log(`Raydium swap initialized`);
  console.log(
    `Swapping ${swapConfig.tokenAAmount} of ${swapConfig.tokenAAddress} for ${swapConfig.tokenBAddress}...`
  );

  /**
   * Load pool keys from the Raydium API to enable finding pool information.
   */
  await raydiumSwap.loadPoolKeys(swapConfig.liquidityFile);
  console.log(`Loaded pool keys`);

  /**
   * Find pool information for the given token pair.
   */
  const poolInfo = raydiumSwap.findPoolInfoForTokens(
    swapConfig.tokenAAddress,
    swapConfig.tokenBAddress
  );
  console.log("Found pool info", poolInfo);
};

poolInfo();
