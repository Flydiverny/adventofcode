input=input.tokenize(' ')
def twos = 0
def trees = 0
input.each {
  def memory = [:]

  it.each { c ->
   memory[c] = (memory[c]?:0)+1

}
def C2 = false
def C3 = false
println memory
memory.each { k, c->

  if (!C2 && c==2) {

C2=true;
twos+=1
}
if (!C3 && c==3) {C3=true;trees+=1}
}

}
println twos
println trees

println twos*trees
