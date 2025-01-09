function liveImpact(){

for(i=1;i<=100;i++){
    if(i%3===0 && i%5===0){
        console.log("live impact")
    }
    else if(i%3===0)
    {
        console.log("live")
    }
    else if(i%5===0)
    {
         console.log("impact")
    }
    else{
        console.log(i)
    }
 
}

}

const liv=liveImpact()


