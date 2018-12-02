
module Utils where

  import System.IO

  parseArgs :: [String] -> Maybe (String, String)
  parseArgs [day, part] = Just (day, part)
  parseArgs [day] = Just (day, "a")
  parseArgs _ = Nothing
