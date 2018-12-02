module Solutions where

  import Dec1A

  solve :: (String, String) -> Maybe ([String] -> String)
  solve ("1", "a") = Just Dec1A.solve
  solve _ = Nothing
