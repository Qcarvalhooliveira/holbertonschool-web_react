namespace Subjects {
    export interface Teacher {
      experienceTeachingJava?: number;
    }
    export class Java extends Subject {
        getRequirements() {
          return 'Here is the list of requirements for Java';
        }
    
        getAvailableTeacher() {
          if (this.teacher && this.teacher.experienceTeachingJava > 0) {
            return 'Available Teacher: ' + this.teacher.firstName;
          } else {
            return 'No available teacher'
          }
        }
      }
    }
    