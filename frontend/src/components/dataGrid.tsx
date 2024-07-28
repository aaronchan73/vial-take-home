import { useEffect, useState } from 'react';
import { Subject, Gender, Status } from '../types/subject';
import { Direction } from '../types/direction';
import {
  Table,
  Checkbox,
  Group,
  Text,
  TextInput,
  Pagination,
  Container,
  Stack,
} from '@mantine/core';

const SUBJECTS_PER_PAGE = 10;

function DataGrid() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [genderFilters, setGenderFilters] = useState<{ Male: boolean; Female: boolean }>({
    Male: false,
    Female: false,
  });
  const [statusFilters, setStatusFilters] = useState<{ Active: boolean; Inactive: boolean }>({
    Active: false,
    Inactive: false,
  });
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortKey, setSortKey] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<Direction>('asc');
  const [activePage, setActivePage] = useState<number>(1);

  // Fetch subjects data from backend
  useEffect(() => {
    const API_URL = "http://localhost:3000/api/subjects";
    
    const fetchSubjects = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Failed to retrieve subjects");
        }
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSubjects();
  }, []);

  // Filter subjects based on gender, status, and/or name
  const filteredSubjects = subjects.filter((subject: Subject) => {
    let genderMatch = true;
    let statusMatch = true;
    const nameMatch = subject.name.toLowerCase().includes(searchTerm.toLowerCase());

    // Check if any of the gender filters are set
    if (genderFilters.Male || genderFilters.Female) {
      genderMatch = genderFilters[subject.gender as Gender];
    }
    
    // Check if any of the status filters are set
    if (statusFilters.Active || statusFilters.Inactive) {
      statusMatch = statusFilters[subject.status as Status];
    }

    // Filter subject if any if they match any of the filters
    return genderMatch && statusMatch && nameMatch;
  });

  // Sort filtered subjects based on direction
  const sortedSubjects = [...filteredSubjects].sort((a, b) => {
    const aValue = a[sortKey as keyof typeof a];
    const bValue = b[sortKey as keyof typeof b];

    // Sort by ascending order
    if (sortDirection === 'asc') {
      if (aValue < bValue) {
        // a should come before b
        return -1
      }
      else if (aValue > bValue) {
        // a should come after b
        return 1;
      }
      else {
        // a equals b and no change is needed
        return 0;
      }
    }
    // Sort by descending order 
    else {
      if (aValue > bValue) {
        // a should come before b
        return -1;
      }
      else if (aValue < bValue) {
        // a should come after b
        return 1;
      }
      else {
        // a equals b and no change is needed
        return 0;
      }
    }
  });

  // Paginate subjects list by a size of SUBJECTS_PER_PAGE
  const paginatedSubjects = sortedSubjects.slice((activePage - 1) * SUBJECTS_PER_PAGE, activePage * SUBJECTS_PER_PAGE);
  const totalPages = Math.ceil(sortedSubjects.length / SUBJECTS_PER_PAGE);

  const rows = paginatedSubjects.map((subject: Subject) => (
    <tr key={subject.id}>
      <td>{subject.name}</td>
      <td>{subject.age}</td>
      <td>{subject.gender}</td>
      <td>{subject.diagnosis_date}</td>
      <td>{subject.status}</td>
    </tr>
  ));

  // Change gender filters by inverting its value
  const handleGenderChange = (gender: Gender) => {
    setGenderFilters((prev) => ({ ...prev, [gender]: !prev[gender] }));
  };

  // Change status filters by inverting its value
  const handleStatusChange = (status: Status) => {
    setStatusFilters((prev) => ({ ...prev, [status]: !prev[status] }));
  };

  // Reverse the sorting direction
  const reverseDirection = (direction: Direction) => {
    if (direction === 'asc') {
      return 'desc';
    } else {
      return 'asc';
    }
  }

  return (
    <Container>
      <Stack>
        <TextInput
          placeholder="Search by name"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.currentTarget.value)}
          styles={{ input: { borderColor: 'deepBlue.5' } }}
        />
        <Group>
          <Text>Filter by Gender:</Text>
          <Checkbox
            label="Male"
            checked={genderFilters.Male}
            onChange={() => handleGenderChange('Male')}
            styles={{ root: { display: 'inline-block', marginRight: '10px' } }}
          />
          <Checkbox
            label="Female"
            checked={genderFilters.Female}
            onChange={() => handleGenderChange('Female')}
            styles={{ root: { display: 'inline-block' } }}
          />
        </Group>
        <Group>
          <Text>Filter by Status:</Text>
          <Checkbox
            label="Active"
            checked={statusFilters.Active}
            onChange={() => handleStatusChange('Active')}
            styles={{ root: { display: 'inline-block', marginRight: '10px' } }}
          />
          <Checkbox
            label="Inactive"
            checked={statusFilters.Inactive}
            onChange={() => handleStatusChange('Inactive')}
            styles={{ root: { display: 'inline-block' } }}
          />
        </Group>
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }} onClick={() => { setSortKey('name'); setSortDirection(reverseDirection(sortDirection)); }}>Name</th>
              <th style={{ textAlign: "left" }} onClick={() => { setSortKey('age'); setSortDirection(reverseDirection(sortDirection)); }}>Age</th>
              <th style={{ textAlign: "left" }}>Gender</th>
              <th style={{ textAlign: "left" }} onClick={() => { setSortKey('diagnosis_date'); setSortDirection(reverseDirection(sortDirection)); }}>Diagnosis Date</th>
              <th style={{ textAlign: "left" }}>Status</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
        <Pagination
          onChange={setActivePage}
          total={totalPages}
          color="deepBlue"
        />
      </Stack>
    </Container>
  );
}

export default DataGrid;