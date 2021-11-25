import random

numbers = [1,2,3]

## TO DO: Decide if the % match threshold is going to be enforced wihtin the ML functions or in one of these

def query_model(sentence, match_threshold):
    # Some ML magic
    randomSeverity = random.choice(numbers)
    case_obj = {'severity': randomSeverity, 'case_text': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros, ut ultrices condimentum rhoncus ultrices urna.', 'match_confidence':0.6}
    return case_obj # includes generalized case, severity, match %, any other information

def get_annotation(terms_text, match_threshold):
    sentences = terms_text.split('.')

    annotation_obj = get_cases(sentences, match_threshold)

    return annotation_obj

def debug_text_to_case_mapping(text_to_case_mapping):
    print(text_to_case_mapping)
    for mapping_obj in text_to_case_mapping:
        if mapping_obj.has_case:
            print('ToS source text: ', mapping_obj.source_text,
            'Plain text case: ', mapping_obj.case_text)

def get_cases(sentences_list, match_threshold):
    text_to_case_mapping = []
    for sentence in sentences_list:
        case = query_model(sentence, match_threshold)
        if case:
            mapping = {
                'source_text': sentence,
                'has_case': True}
            mapping.update(case)
            text_to_case_mapping.append(mapping)
        else:
            text_to_case_mapping.append({
                'source_text': sentence,
                'has_case': False})

    # debug_text_to_case_mapping(text_to_case_mapping) # comment out for production
    return text_to_case_mapping 

# get_annotation('Hello there. This is my tos text feel free to debug with it', .75)
