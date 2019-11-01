import * as uuid from 'uuid';

export class FileUpload {
  key: string;
  name: string;
  url: string;
  file: File;
  comments: Commentaire[] = [];

  constructor(file: File) {
    this.file = file;
  }
}

export class Commentaire {
  id: string;
  content: string;

  constructor(content: string) {
    this.content = content;
    this.id = uuid.v4();
  }
}
