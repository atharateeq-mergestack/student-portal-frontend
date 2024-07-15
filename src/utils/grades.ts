export const grades = [
    { value: 'A+', label: 'A+' },
    { value: 'A-', label: 'A-' },
    { value: 'B+', label: 'B+' },
    { value: 'B-', label: 'B-' },
    { value: 'F', label: 'F' }
  ];
  
 export const getGradeClassName = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A-':
        return 'a-plus-minus';
      case 'B+':
      case 'B-':
        return 'b-plus-minus';
      case 'F':
        return 'f';
      default:
        return '';
    }
  };
  