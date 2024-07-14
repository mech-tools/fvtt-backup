


Hooks.on("updateActor", (actor,changes,diff,userId) => {

  let isv12=parseInt(game.version)>11; /// remove in the next version

  
   if (game.user.id==userId && changes.name!==undefined){


    /// changing name in the sheet
    if (isv12){       
      actor.update({"prototypeToken.name":changes.name});
    } else {  /// remove in the next version
      actor.update({"token.name":changes.name});
    }
    
   
    /// if it's a sheet from a unlinked token (double-click)
    if (actor.isToken){
      
      if (isv12){
        canvas.tokens.get(actor.token.id).document.update({"name":changes.name});
      } else { /// remove in the next version
        canvas.tokens.get(actor.token.id).update({"name":changes.name});
      }
      
    }
   
    
   }
});
