export class Timestamp {
  constructor(dateString) {
    this.postCreationTime = new Date(dateString);

    this.time = Number.MAX_SAFE_INTEGER;
  }

  getPostTimestamp(now) {
    const timeDiff = now.getTime() - this.postCreationTime.getTime();

    return this.truncateTime(timeDiff, now);
  }

  truncateTime(milliseconds, now) {
    if ((this.time = Math.floor(milliseconds / 1000)) < 60) {
      return `${this.time}s`;
    } else if ((this.time = Math.floor(this.time / 60)) < 60) {
      return `${this.time}m`;
    } else if ((this.time = Math.floor(this.time / 60)) < 24) {
      return `${this.time}h`;
    } else if ((this.time = Math.floor(this.time / 24)) < 7) {
      return `${this.time}d`;
    }

    const dateString = this.postCreationTime.toString().split(" ");

    if (this.postCreationTime.getFullYear() === now.getFullYear()) {
      return `${dateString[1]} ${dateString[2]}`;
    }

    return `${dateString[1]} ${dateString[2]} ${dateString[3]}`;
  }
}

export default Timestamp;
