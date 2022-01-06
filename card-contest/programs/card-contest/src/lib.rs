use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod card_contest {
    use super::*;
    pub fn init_game(ctx: Context<InitGame>) -> ProgramResult {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitGame {

}

#[account]
pub struct Game<'info> {
    pub type: String,
    pub hand: Pubkey[],
}