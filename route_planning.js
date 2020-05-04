
	JavaScript code to plan the route between 2 cities, given the intermediate connections and their costs.
	Input Format:
		First line must have source and destination city.
		Next lines to have to all the connected cities and their costs.
		Sample inputs are given at the end of the file.
*/

process.stdin.resume();
process.stdin.setEncoding("utf-8");
var stdin_input = "";
process.stdin.on("data", function (input) {
    stdin_input += input;
});
process.stdin.on("end", function () {
   main(stdin_input);
});

function routePlanner(routes, dep, arr) {
    let dfs_stack = [], options = [];
    if (!routes.hasOwnProperty(dep)) {
        return 'No Trains';
    }
    dfs_stack.push({last : dep, conn : [dep], cost : 0});
    while (dfs_stack.length > 0) {
        let top = dfs_stack.pop();
        if (top.last === arr) {
            options.push({conn : top.conn, cost : top.cost});
        }
        else if (routes.hasOwnProperty(top.last)) {
            routes[top.last].map(links => {
                let next, c;
                [next, c] = [...links];
                if (!top.conn.includes(next)) {
                    let temp = {};
                    temp.last = next;
                    temp.conn = top.conn.concat([next]);
                    temp.cost = top.cost + c;
                    dfs_stack.push(temp);
                }
            })
        }
    }
    options.sort((a, b) => ((a.cost===b.cost) ? (a.conn.length - b.conn.length) : (a.cost - b.cost)));
    return options.map(x => x.conn.concat([x.cost.toString()]).join(' ')).join('\n');
}

function main(input) {
    input = input.split('\n');
    let dep, arr;
    [dep, arr] = [...input.shift().split(' ')];
    let routes = {};
    input.map(route => {
        let dep1, arr1, c;
        [dep1, arr1, c] = [...route.split(' ')];
        if (routes.hasOwnProperty(dep1)) {
            routes[dep1].push([arr1, parseInt(c, 10)]);
        }
        else {
            routes[dep1] = [[arr1, parseInt(c, 10)]];
        }
    });
    let dfs_stack = [], options = [];
    if (!routes.hasOwnProperty(dep)) {
        return 'No Trains';
    }
    dfs_stack.push({last : dep, conn : [dep], cost : 0});
    while (dfs_stack.length > 0) {
        let top = dfs_stack.pop();
        if (top.last === arr) {
            options.push({conn : top.conn, cost : top.cost});
        }
        else if (routes.hasOwnProperty(top.last)) {
            routes[top.last].map(links => {
                let next, c;
                [next, c] = [...links];
                if (!top.conn.includes(next)) {
                    let temp = {};
                    temp.last = next;
                    temp.conn = top.conn.concat([next]);
                    temp.cost = top.cost + c;
                    dfs_stack.push(temp);
                }
            })
        }
    }
    options.sort((a, b) => ((a.cost!=b.cost) ? (a.cost - b.cost) : (a.conn.length - b.conn.length)));
    options.map(x => {
        console.log(x.conn.concat([x.cost.toString()]).join(' '));
    });
}


/*
Bangalore Hyderabad
Bangalore Hyderabad 10000
Bangalore Chennai 4000
Chennai Hyderabad 4000
*/
/*
Bangalore Coimbatore 
Bangalore Coimbatore 10000
Bangalore Chennai 4000
Chennai Coimbatore 5000
Chennai Coimbatore 6000
*/
