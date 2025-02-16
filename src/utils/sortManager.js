export const sortManager = (arr) => {
    arr?.sort(function(a, b) {
        if(b.position !== 'director') {
           return -1
        }

        if(b.position == 'director') {
           return 1
        }

        if(a.position == 'director') {
           return 1
        }

        if(a.position !== 'director') {
           return -1
        }
     })
     return arr
}