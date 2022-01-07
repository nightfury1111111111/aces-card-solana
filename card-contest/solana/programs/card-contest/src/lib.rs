use anchor_lang::prelude::*;

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

// Helper functions
pub fn rank_hand(hand:)

// Instruction handling

#[program]
pub mod card_contest {
    use super::*;
    pub fn init_game(ctx: Context<InitGame>) -> ProgramResult {
        Ok(())
    }
}

// Context definitions

#[derive(Accounts)]
#[instruction(seed: String, bump: u8, game_type: String)]
pub struct InitGame {
    #[account(mut, signer)]
    pub player: AccountInfo<'info>,
    #[account(
        init,
        seeds = ,
        bump = ,
        payer = player
    )]
    pub game: Account<'info, Game>,
    #[account(executable, address = system_program::ID)]
    pub system_program: 
}

// Account types

#[account]
pub struct GameEntry {
    pub player: Pubkey,
    pub game_type: String,
    pub hand: Pubkey[],
    pub score: String,
}

#[account]
pub struct Game {
    pub entries: Pubkey[], // GameEntry PDAs
}

// User storage

