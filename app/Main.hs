module Main where

import System.Environment
import Lib
-- import Utils
import Solutions

main :: IO ()
main = do
  args <- getArgs
  parsed <- parseArgs(args)
  putStrLn (solve(parsed)("test"))

-- solve :: [String] -> String
-- solve [day, part] = "Sovling " ++ day ++ " part " ++ part
-- solve [day] = "Solving " ++ day ++ " part a"
-- solve _ = ""

parseArgs :: [String] -> (String, String)
parseArgs [day, part] = Just (day, part)
parseArgs [day] = Just (day, Show "a")
-- parseArgs _ = Nothing
