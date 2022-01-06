const anchor = require('@project-serum/anchor');

describe('card-contest', () => {

  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());
  const program = anchor.workspace.CardContest;

  it('Game is initialized!', async () => {
    const tx = await program.rpc.initGame();
  });
});
