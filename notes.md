Legacy Objects

Faction Cards -> Actors
Missile Tokens -> Actor>Attribute
Star Tokens -> Actor>Attribute
Game Result -> Actor>Attribute (Starting Territory, gameResult="held on, won, knocked out")

```
actor.data.gameResults= {
  0: {startingTerritory: "", endResult: ""}
}
```

Faction Power Stickers -> Items>"Powers"
Teritory Cards -> Items>"TerritoryCards"

Rule Packs->Compendium(JournalEntry) (RulePack1_JournalEntries, RulePack_Powers, etc)

Event Cards -> RollTable->JournalEntries
Mission Cards => JournalEntries=>RollTable

Board Stickers -> JournalEntries>Compendium>Tiles
Winner Sticker Sheet -> JournalEntries>Compendium>Tiles

Draft Rules -> Journal Entries, use Macro to put them on table for players to "Draw" from
