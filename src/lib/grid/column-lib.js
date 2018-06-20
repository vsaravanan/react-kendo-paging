


export const toggleColumn = (id, columns ) => {
    let visibleSolumnsCount = 0
    for(let i = 0; i < columns.length; i++ ){
      if(columns[i].show === true) {
        visibleSolumnsCount++
      }
    }
    if(visibleSolumnsCount === 2 && columns[id].show === true){
      this.oneVisibleColumn = true
    }
    else{
      this.oneVisibleColumn = false
    }


    const tmp = { columns : columns.map((column, idx) => {
      return idx  === id ? { ...column, show: !column.show } : column
        }
    ), oneVisibleColumn : this.oneVisibleColumn };

    return tmp  ;

 }