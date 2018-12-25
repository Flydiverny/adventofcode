input = input.tokenize(' ')

def result = input.find { start ->
  def m = [:]
  def buff = input
  def l = start

  l.eachWithIndex { c, i->
    buff = buff.findAll { w ->
      if (w[i] == c) return true
      if (m[w]) return false
      m[w] = true
      return true
    }
  }

  if(buff.size() > 1)
    println start + buff

  return buff.size() > 1
}
​
