class BiDirectionalPriorityQueue {
    constructor() {
        this.queue = [];
    }
    enqueue(data, priority) {
        const e = {
            data: data,
            priority: priority,
        }
        this.queue.push(e);
    };

    findIndex(type) {
        if (type === "newest") {return this.queue.length - 1};
        if (type === "oldest") {return 0};
        if (type === "highest") {
            let max = this.queue[0].priority;
            let index = 0;
            for (let i = 1; i < this.queue.length; i++) {
                if (this.queue[i].priority > max) {
                    max = this.queue[i].priority;
                    index = i;
                }}
            return index}
        if (type === "lowest") {
            let min = this.queue[0].priority;
            let index = 0;
            for (let i = 1; i < this.queue.length; i++) {
                if (this.queue[i].priority < min) {
                    min = this.queue[i].priority;
                    index = i;
                }}
            return index}
    };

    dequeue(type) {
        const index = this.findIndex(type);
        const data = this.queue[index].data;
        this.queue.splice(index, 1);
        return data;
    };

    peek(type) {
        const index = this.findIndex(type);
        return this.queue[index].data;
    };
}

const queue = new BiDirectionalPriorityQueue();
queue.enqueue('a', 8);
queue.enqueue('b', 5);
queue.enqueue('c', 3);
queue.enqueue('d', 9);
queue.enqueue('e', 4);
console.log(queue.peek('highest')); // d
console.log(queue.peek('lowest')); // c
console.log(queue.peek('newest')); // e
console.log(queue.peek('oldest')); // a
console.log(queue.dequeue('highest')); // d
console.log(queue.dequeue('highest')); // a
console.log(queue.dequeue('oldest')); // b